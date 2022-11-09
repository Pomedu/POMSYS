import { BiDownload, BiClipboard } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from "../../store/modules/modalSlice";
import AddFileModal from "../Modals/AddFileModal";

const FileListCard = (props) => {
    const files = useSelector(state=>state.tests.testsData);
    const addFileModalOpen = useSelector((state)=>state.modal.show);
    const dispatch = useDispatch();

    const ModalOpenHandler = () =>{
        dispatch(modalOpen('addFileModal'));
    };

    // const onCreate = (newFile) => {

    // }

    const fileDownloadHandler = (e, file) => {
        e.preventDefault();
        downloadFile(file);
    };

    function downloadFile(file) {
        const downloadUrl = "http://127.0.0.1:8000" + file.test_file
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
                    <h4 className="card-title mb-4">{props.title}</h4>
                    <div className="row">   
                        <div className="col-6">
                            <h5 className="text-secondary">등록된 파일이 없습니다</h5>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary float-end" onClick={ModalOpenHandler}>파일추가</button></div>
                    </div>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    {files.map((file) => {
                        return (
                            <div key={file.name} className="d-flex mt-4 align-items-center clickable" onClick={(e) => fileDownloadHandler(e, file)}>
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-xs ">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiClipboard />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 align-middle">
                                    <h5 className="font-size-14 mb-1 w-75 text-omit"><a className="text-dark">{file.name}</a></h5>
                                    <small>Size : 3.25 MB</small>
                                </div>
                                <div>
                                    <a className="text-dark" ><i className="h3 m-0"><BiDownload/></i></a>
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
    </>
    );
};

export default FileListCard