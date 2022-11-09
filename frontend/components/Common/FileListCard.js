import { useEffect, useState } from "react";
import { BiDownload, BiClipboard, BiPlus, BiTrashAlt, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAttachment, fetchLessonAttachments } from "../../store/modules/attachmentsSlice";
import { modalOpen } from "../../store/modules/modalSlice";
import AddFileModal from "../Modals/AddFileModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const FileListCard = (props) => {
    const files = useSelector(state=>state.attachments.attachmentsData);
    const attachmentData = useSelector(state => state.attachments.attachmentData);
    const lessonData = useSelector(state=>state.lessons.lessonData);
    const dispatch = useDispatch();

    // Data Upload
    const addFileModalOpen = useSelector((state)=>state.modal.show);
    const ModalOpenHandler = () =>{
        dispatch(modalOpen('addFileModal'));
    };

    // Data Delete
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");

    const deleteButtonHandler = (id, name) =>{
        setDeleteId(id);
        setDeleteName(name);
        dispatch(modalOpen('attachmentDeleteModal'));
    }

    const onDelete = (e, fileId) => {
        e.preventDefault();
        dispatch(deleteAttachment(fileId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    useEffect(()=>{
        dispatch(fetchLessonAttachments(lessonData.id));
    },[attachmentData]);

    // Data Download
    const fileDownloadHandler = (e, file) => {
        e.preventDefault();
        downloadFile(file);
    };
    
    function downloadFile(file) {
        const downloadUrl = "http://127.0.0.1:8000" + file.attachment_file
        fetch(downloadUrl, { method: 'GET' })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                setTimeout((_) => {
                    window.URL.revokeObjectURL(url);
                }, 60000);
                link.remove();
                (false);
            })
            .catch((err) => {
                console.error('err: ', err);
            });
    };

    return (<>
        {files.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title} <button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 파일추가</button></h4>
                    <h5 className="text-secondary">등록된 파일이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title} <button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 파일추가</button></h4>
                    {files.map((file) => {
                        return (
                            <div key={file.name} className="d-flex mt-4 align-items-center" >
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-xs ">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiClipboard />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 align-middle">
                                    <h5 className="font-size-14 mb-1 w-75 text-omit"><a className="text-dark">{file.name}</a></h5>
                                    <small>Size : {(file.size/1024 ** 2).toFixed(2)} MB</small>
                                </div>
                                <div>
                                    <a className="text-dark clickable" onClick={(e) => fileDownloadHandler(e, file)}><i className="h3 me-2 "><BiDownload/></i></a>
                                    <a className="text-danger clickable" onClick={(e) => deleteButtonHandler(file.id, file.name)}><i className="h3 m-0 text-danger"><BiTrash/></i></a>
                                </div>
                            </div>)
                    })}
                </div>
            </div>}
            <AddFileModal
            ModalOpen={addFileModalOpen}
            // onChange={onCreate}
            modalId={'addFileModal'}
            />
            <DeleteModal 
                Id={deleteId}
                Name={deleteName} 
                ModalOpen={deleteModalOpen}
                onChange={onDelete}
                modalId={'attachmentDeleteModal'}
            />
    </>
    );
};

export default FileListCard