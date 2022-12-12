import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaYoutube } from "react-icons/fa";

const ClientPage = () => {

    return (
        <div>
            <div className="client-main-logo">
                <img src="../images/Client_logo.png"/>
            </div> 
            <div> 
                <div className="client-greeting ms-4 mt-2">안녕하세요, 길동님</div> 
                <div className="client-date ms-4">08 December, 2022</div>
            </div>
            <div className="m-4">
            <Swiper
                breakpoints={{
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
                slidesPerView={1.1}
                pagination={{ clickable: true }}
                spaceBetween={5}
                loop={true}
                >
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-body">
                            <div className="font-size-12" style={{color:'#8758FF'}}>
                                <FaYoutube/> Latest Video
                            </div> 
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 17일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-body">
                            <div className="font-size-12" style={{color:'#8758FF'}}>
                                <FaYoutube/> Latest Video
                            </div> 
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 17일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-body">
                            <div className="font-size-12" style={{color:'#8758FF'}}>
                                <FaYoutube/> Latest Video
                            </div> 
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 17일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                </Swiper>
            </div>
            
        </div>
    )

}

ClientPage.layout = "L2";

export default ClientPage