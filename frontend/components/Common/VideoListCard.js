import { FaYoutube } from 'react-icons/fa';
import { BiVideo } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const VideoListCard = (props) => {
    const videos = useSelector(state=>state.videos.videosData);

    return (<>
        {videos.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}</h4>
                    <h5 className="text-secondary">등록된 영상이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    {videos.map((video) => {
                        return (
                            <div key={video.name} className="d-flex mt-4 align-items-center clickable" onClick={(e) => videoClickHandler(e, video.link)}>
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
                                    <span className="text-danger font-size-24"><FaYoutube/></span>
                                </div>
                            </div>)
                    })}
                </div>
            </div>}
    </>
    );
};

export default VideoListCard