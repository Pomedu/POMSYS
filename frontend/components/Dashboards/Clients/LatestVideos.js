
import { useState } from "react";
import { BiMale } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import FsLightbox from 'fslightbox-react';
import { useDispatch } from "react-redux";
import { fetchStudentVideoWatchRecords, updateVideoWatchRecord } from "../../../store/modules/videosSlice";

const LatestVideoCard = (props) => {   

    const latestVideos = [...props.videosData]
    // Video Watch
    const [videoLink, setVideoLink] = useState(null);
    const [lightboxToggler, setLightboxToggler] = useState(false);

    const dispatch = useDispatch();

    const videoWatchHandler = (e, video) => {
        e.preventDefault();
        setVideoLink(video.link);
        setLightboxToggler(!lightboxToggler);
        dispatch(updateVideoWatchRecord({clicked: {clicked:props.videoWatchRecordsData.find(record=>record.video.id==video.id).clicked+1},
            videoWatchRecordId: props.videoWatchRecordsData.find(record=>record.video.id==video.id).id}));
    };

    return (
        <div>
        <Swiper
        breakpoints={{
        200: {
            slidesPerView: 1.1,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2.5,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3.5,
        },
        1200: {
          slidesPerView: 4.5,
        }
        }}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        spaceBetween={5}
        slideToClickedSlide={true}
        loop={true}
        >
        {latestVideos.sort((a, b) =>new Date(b.lesson.date) -new Date(a.lesson.date)).map(video=>{return(
            <SwiperSlide key={video.id}>
            {({isActive})=>(
                <div className="card" style={
                    {opacity:isActive?"1":"0.5"}}>
                    <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                        <FaYoutube/> Latest Video
                    </div> 
                    <div className="card-body">
                        <div className="justify-content-between d-flex">
                        <div className="flex-grow-1 align-middle">
                            <div className="fw-semibold">
                                {video.name}
                            </div>
                            <div>[{video.lesson.lecture}]</div>
                            <div className="font-size-12">{video.lesson.date} 일자 수업</div>
                        </div>
                        <div className="text-center">
                            <a className="text-dark clickable" onClick={(e) => videoWatchHandler(e, video)} ><i className="h1 text-danger text-center"><FaYoutube/></i></a>   
                            {props.videoWatchRecordsData.find(record=>record.video.id==video.id)?
                            <div className="text-info font-size-12">
                                [view: {props.videoWatchRecordsData.find(record=>record.video.id==video.id).clicked}]
                            </div>
                            :<></>}                                                           
                        </div> 
                        </div>                           
                    </div>
                </div>
                )}
            </SwiperSlide>
        )})}      
        </Swiper>
        <FsLightbox
            toggler={lightboxToggler}
             sources = {[videoLink]} 
            />
    </div>
    );
};

export default LatestVideoCard