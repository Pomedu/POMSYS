import { FaYoutube } from 'react-icons/fa';
import { BiPlus, BiTrash, BiVideo } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import AddVideoModal from '../Modals/AddVideoModal';
import { deleteVideo, fetchLessonVideos } from '../../store/modules/videosSlice';
import { useEffect, useState } from 'react';
import DeleteModal from '../Modals/DeleteModal';
import { modalOpen } from '../../store/modules/modalSlice';
import FsLightbox from 'fslightbox-react';

const VideoListCard = (props) => {
    const videos = useSelector(state=>state.videos.videosData);
    const videoData = useSelector(state=>state.videos.videoData);
    const lessonData = useSelector(state=>state.lessons.lessonData);
    const dispatch = useDispatch();

    // Data Upload
    const addVideoModalOpen = useSelector((state)=>state.modal.show);
    const ModalOpenHandler = () =>{
        dispatch(modalOpen('addVideoModal'));
    };

    // Data Delete
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");

    const deleteButtonHandler = (id, name) =>{
        setDeleteId(id);
        setDeleteName(name);
        dispatch(modalOpen('videoDeleteModal'));
    }

    const onDelete = (e, videoId) => {
        e.preventDefault();
        dispatch(deleteVideo(videoId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    useEffect(()=>{
        if(lessonData.id){
            dispatch(fetchLessonVideos(lessonData.id));
        }
    },[videoData]);

    // Video Watch
    const [videoLink, setVideoLink] = useState(null);
    const [lightboxToggler, setLightboxToggler] = useState(false);

    const videoWatchHandler = (e, video) => {
        e.preventDefault();
        setVideoLink(video.link);
        setLightboxToggler(true);
    };

    return (<>
        {videos.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title} <button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 영상추가</button></h4>
                    <h5 className="text-secondary">등록된 영상이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title} <button className="btn btn-sm btn-primary float-end" onClick={ModalOpenHandler}><BiPlus/> 영상추가</button></h4>
                    {videos.map((video) => {
                        return (
                            <div key={video.name} className="d-flex mt-4 align-items-center clickable">
                               <div className="flex-shrink-0 me-3">
                                    <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                                            <BiVideo />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 align-middle">
                                    <div className="font-size-14 w-75 text-omit fw-medium">{video.name}</div>
                                </div>
                                <div>
                                    <a className="text-dark clickable" onClick={(e) => videoWatchHandler(e, video)}><i className="h3 me-2 text-danger"><FaYoutube/></i></a>
                                    <a className="text-danger clickable" onClick={(e) => deleteButtonHandler(video.id, video.name)}><i className="h3 m-0 text-danger"><BiTrash/></i></a>
                                </div>
                            </div>)
                    })}
                </div>
            </div>}
            <AddVideoModal
            ModalOpen={addVideoModalOpen}
            modalId={'addVideoModal'}
            />
            <DeleteModal 
                Id={deleteId}
                Name={deleteName} 
                ModalOpen={deleteModalOpen}
                onChange={onDelete}
                modalId={'videoDeleteModal'}
            />
            <FsLightbox
            toggler={lightboxToggler}
             sources = {[videoLink]} 
            />
    </>
    );
};

export default VideoListCard