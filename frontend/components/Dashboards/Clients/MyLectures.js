
import { useState } from "react";
import { BiMale } from "react-icons/bi";
import { FaDoorOpen, FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import FsLightbox from 'fslightbox-react';
import Link from "next/link";

const MyLecturesCard = (props) => {   
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
                >
                {props.lecturesData.length>0?props.lecturesData.map(lecture=>{return(
                    <SwiperSlide  key={lecture.id}>
                        <Link href={`/client/lectureroom/${lecture.id}`}>
                        <div className="card mt-3 bg-secondary">                        
                            <div className="card-body">
                                <div className="text-white justify-content-between align-items-middle" style={{display:'flex'}}>
                                    <div>
                                        <div className=" fw-semibold font-size-16">
                                            {lecture.name}                               
                                        </div>
                                        <div className="font-size-14">
                                            {lecture.teacher} 선생님
                                        </div>
                                    </div>
                                    <div className="h1 text-warning"><FaDoorOpen/></div>                                
                                </div>
                            </div>
                        </div>
                        </Link>
                    </SwiperSlide>
                )}):<SwiperSlide>
                    <div className="card mt-3 bg-soft bg-danger">
                        <div className="card-body">
                            <div className="text-white justify-content-between align-middle" style={{ display: 'flex' }}>
                                <div>
                                    <div className="fw-semibold font-size-16 text-white">
                                        강의가 없습니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                }                
                </Swiper>
            </div>
    );
};

export default MyLecturesCard