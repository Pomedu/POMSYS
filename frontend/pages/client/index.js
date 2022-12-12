import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaYoutube, FaCalendar } from "react-icons/fa";
import AChart from '../../components/Common/AChart';

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
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                            <FaYoutube/> Latest Video
                        </div> 
                        <div className="card-body">
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 18일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                            <FaYoutube/> Latest Video
                        </div> 
                        <div className="card-body">
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 18일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3 client-card" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                            <FaYoutube/> Latest Video
                        </div> 
                        <div className="card-body">
                            <div className="fw-semibold">
                                중등 G1 CLASS 8월 18일 복습영상
                            </div>
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                </Swiper>
            </div>
            <div className="card mt-3 m-4 client-card"> 
                <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}> 
                    <div className="justify-content-between" style={{display:'flex'}}>
                        <div><FaCalendar/> My Calendar</div>
                        <div className="text-primary">More</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row"> 
                        <div className='mb-1 col-lg-3'>
                            <div className="fw-semibold font-size-14">2022.12.24 일요일</div>
                            <div className="fw-semibold font-size-14 justify-content-between" style={{display:'flex', color:"#FFD058"}}>
                                <div>| 미적분 개념 유형반</div>
                                <div className="text-black font-size-12"><span className="align-middle">18:00 ~ 21:00</span></div>                            
                            </div>
                            <div className="fw-semibold font-size-14 justify-content-between" style={{display:'flex', color:"#5CB8E4"}}>
                                <div>| 중등부 고등영어 정복반</div>
                                <div className="text-black font-size-12"><span className="align-middle">21:00 ~ 23:00</span></div> 
                            </div>
                        </div>
                        <div className='mb-1 col-lg-3'>
                            <div className="fw-semibold font-size-14">2022.12.25 월요일</div>
                            <div className="fw-semibold font-size-14 justify-content-between" style={{display:'flex', color:"#FFD058"}}>
                                <div>| 미적분 개념 유형반</div>
                                <div className="text-black font-size-12"><span className="align-middle">18:00 ~ 21:00</span></div>                            
                            </div>
                            <div className="fw-semibold font-size-14 justify-content-between" style={{display:'flex', color:"#5CB8E4"}}>
                                <div>| 중등부 고등영어 정복반</div>
                                <div className="text-black font-size-12"><span className="align-middle">21:00 ~ 23:00</span></div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-4">
                <div className="font-size-20 text-white fw-semibold"> 내가 수강중인 강의 </div>
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
                <SwiperSlide>
                    <div className="card mt-3 client-card bg-secondary">                        
                        <div className="card-body">
                            <div className="text-white justify-content-between align-middle" style={{display:'flex'}}>
                                <div>
                                    <div className=" fw-semibold font-size-16">
                                        중등 G1 CLASS                               
                                    </div>
                                    <div className="font-size-14">
                                        허준성 선생님
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                </Swiper>
            </div>

            <div className="m-4">
                <div className="font-size-20 text-white fw-semibold"> 나의 학습현황 </div>
                <div className="card mt-3 client-card bg-dark"> 
                <div className="card-body">
                    <div className="row"> 
                        <div className='mb-1 col-lg-3'>
                            <div className="fw-semibold font-size-14" style={{color:"#FFD058"}}>출석현황</div>
                            <AChart options={{  
                                legend: {
                                    show: false
                                    },
                                fill:{
                                    colors: ['#EEEEEE','#38E54D']
                                },  
                                dataLabels: {
                                    enabled: true,
                                    formatter: function (val,{ seriesIndex, dataPointIndex, w }) {
                                      return w.config.series[seriesIndex]
                                    }
                                },       
                                labels: ["결석","출석"],                 
                                plotOptions: {
                                    pie: {
                                      expandOnClick: false,
                                      donut: {
                                        labels: {
                                            show: true,
                                            formatter: function (val) {                                            
                                                return val
                                            },
                                            total: {
                                                show: true,
                                                label: '출석률',
                                                color: 'white',
                                                fontFamily: 'Pretendard Variable',
                                                fontWeight: 500,
                                                formatter: function (val) {
                                                    const sum = val.globals.seriesTotals.reduce((a, b) => {
                                                        return a + b;
                                                  }, 0);
                                                return Math.round(val.globals.series[1]/sum*1000)/10 + "%"
                                              },
                                            },
                                            fontFamily: 'Pretendard Variable',
                                            value: {
                                                fontSize: '22px',
                                                show: true,
                                                color: '#38E54D',
                                            },                                            
                                      }
                                    }
                                  }
                                }}}
                                series={[10,80]}                                                                                       
                                type="donut"
                                width='280px' />
                        </div>
                        <div className='mb-1 col-lg-3'>
                            <div className="fw-semibold font-size-14" style={{color:"#5CB8E4"}}>테스트 점수</div>
                            
                        </div>

                        <div className='mb-1 col-lg-3'>
                            <div className="fw-semibold font-size-14" style={{color:"#A555EC"}}>영상복습 현황</div>
                        </div>
                
                    </div>
                </div>
            </div>
            </div>
        </div>
    )

}

ClientPage.layout = "L2";

export default ClientPage