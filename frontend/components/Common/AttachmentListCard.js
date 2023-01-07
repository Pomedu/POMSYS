import { useEffect, useState } from "react";
import { BiDownload, BiClipboard, BiPlus, BiTrashAlt, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAttachment, fetchLessonAttachments } from "../../store/modules/attachmentsSlice";
import { modalOpen } from "../../store/modules/modalSlice";
import AddAttachmentModal from "../Modals/AddAttachmentModal";
import DeleteModal from "../Modals/DeleteModal";

const AttachmentListCard = (props) => {    
    const userData = useSelector(state => state.accounts.userData);
    const attachments = useSelector(state=>state.attachments.attachmentsData);
    const attachmentData = useSelector(state => state.attachments.attachmentData);
    const lessonData = useSelector(state=>state.lessons.lessonData);
    const dispatch = useDispatch();

    // Data Upload
    const addAttachmentModalOpen = useSelector((state)=>state.modal.show);
    const ModalOpenHandler = () =>{
        dispatch(modalOpen('addAttachmentModal'));
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

    const onDelete = (e, attachmentId) => {
        e.preventDefault();
        dispatch(deleteAttachment(attachmentId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    useEffect(()=>{
        if(lessonData.id){
        dispatch(fetchLessonAttachments(lessonData.id));
        }
    },[attachmentData]);

    // Data Download
    const attachmentDownloadHandler = (e, attachment) => {
        e.preventDefault();
        downloadAttachment(attachment);
    };
    
    function downloadAttachment(attachment) {
        const downloadUrl = "http://127.0.0.1:8000" + attachment.attachment_file
        fetch(downloadUrl, { method: 'GET' })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = attachment.name;
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
        {attachments.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title} 
                    {userData.role=='S'?<></>
                    :<button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 파일추가</button>}
                    </h4>
                    <h5 className="text-secondary">등록된 파일이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title} 
                    {userData.role=='S'?<></>
                    :<button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 파일추가</button>}
                    </h4>
                    {attachments.map((attachment) => {
                        return (
                            <div key={attachment.name} className="d-flex mt-4 align-items-center" >
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-xs ">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiClipboard />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 align-middle">
                                    <h5 className="font-size-14 mb-1 w-75 text-omit"><a className="text-dark">{attachment.name}</a></h5>
                                    <small>Size : {(attachment.size/1024 ** 2).toFixed(2)} MB</small>
                                </div>
                                <div>
                                    <a className="text-dark clickable" onClick={(e) => attachmentDownloadHandler(e, attachment)}><i className="h3 me-2 "><BiDownload/></i></a>
                                    {userData.role=='S'?<></>
                                    :<a className="text-danger clickable" onClick={(e) => deleteButtonHandler(attachment.id, attachment.name)}>
                                    <i className="h3 m-0 text-danger"><BiTrash/></i></a>}                                    
                                </div>
                            </div>)
                    })}
                </div>
            </div>}
            <AddAttachmentModal
            ModalOpen={addAttachmentModalOpen}
            // onChange={onCreate}
            modalId={'addAttachmentModal'}
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

export default AttachmentListCard