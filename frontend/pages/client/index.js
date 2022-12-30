import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaYoutube, FaCalendar } from "react-icons/fa";
import AChart from '../../components/Common/AChart';
import moment from "moment";
import "moment/locale/ko"
import { useSelector } from "react-redux";

const ClientPage = () => {
    const userData = useSelector(state => state.accounts.userData);

    return (
        <div>
            <div> 
                <div className="client-greeting ms-4 mt-2 text-white">안녕하세요, <span className="text-info">{userData.name}</span>님</div> 
                <div className="client-date ms-4 text-white">{moment().format('YYYY년 MM월 DD일')}</div>
            </div>
            <div className="m-4">
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
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3" style={
                        {opacity:isActive?"1":"0.5"}}>
                        <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                            <FaYoutube/> Latest Video
                        </div> 
                        <div className="card-body">
                            <div className="justify-content-between d-flex">
                            <div className="flex-grow-1 align-middle">
                                <div className="fw-semibold">
                                    중등 G1 CLASS 8월 18일 복습영상
                                </div>
                                <div>[이런영상 저런영상]</div>
                            </div>
                            <div>
                                <a className="text-dark clickable" ><i className="h1 me-2 text-danger"><FaYoutube/></i></a>                                    
                            </div> 
                            </div>                           
                        </div>
                    </div>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({isActive})=>(
                    <div className="card mt-3" style={
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
                    <div className="card mt-3" style={
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
            <div className="card mt-3"> 
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
            <div>
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
                    <div className="card mt-3 bg-secondary">                        
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

            <div>
                <div className="font-size-20 text-white fw-semibold"> 나의 학습현황 </div>
                <div className="card mt-3 bg-dark"> 
                <div className="card-body">
                    <div className="row"> 
                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{color:"#FFD058"}}>출석현황</div>
                            <AChart options= {{
                                colors: ["#20E647"],
                                plotOptions: {
                                    radialBar: {
                                    hollow: {
                                        margin: 0,
                                        size: "70%",
                                        background: "#293450"
                                    },
                                    track: {
                                        dropShadow: {
                                        enabled: true,
                                        top: 2,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.15
                                        }
                                    },
                                    dataLabels: {
                                        name: {
                                        offsetY: -10,
                                        color: "#fff",
                                        fontSize: "13px"
                                        },
                                        value: {
                                        color: "#fff",
                                        fontSize: "30px",
                                        show: true
                                        }
                                    }
                                    }
                                },                              
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                      shade: "dark",
                                      type: "vertical",
                                      gradientToColors: ["#87D4F9"],
                                      stops: [0, 100]
                                    }
                                },
                                labels: ["출석률"]
                              }}
                              series= {[67]}
                              type='radialBar'/>  
                        </div>
                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{color:"#5CB8E4"}}>테스트 점수</div>
                            <AChart
                            options= {{
                                plotOptions: {
                                  bar: {
                                    horizontal: true,
                                  }
                                },
                                colors: ['#00E396'],
                                dataLabels: {
                                  formatter: function(val, opt) {
                                    const goals =
                                      opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                                        .goals
                                
                                    if (goals && goals.length) {
                                      return `${val} / ${goals[0].value}`
                                    }
                                    return val
                                  }
                                },
                                legend: {
                                  show: true,
                                  showForSingleSeries: true,
                                  customLegendItems: ['실제점수', '평균'],
                                  markers: {
                                    fillColors: ['#00E396', '#775DD0']
                                  }
                                },
                              }}
                              series= {[{
                                name: "실제점수",
                                data: [
                                    {
                                        x: '2011',
                                        y: 12,
                                        goals: [{
                                            name:'평균',
                                            value: 14,
                                            strokeWidth: 5,
                                            strokeHeight: 10,
                                            strokeColor: '#775DD0'
                                        }]
                                    },
                                    {
                                        x: '2012',
                                        y: 44,
                                        goals: [{
                                            name:'평균',
                                            value: 54,
                                            strokeWidth: 5,
                                            strokeHeight: 10,
                                            strokeColor: '#775DD0'
                                    }]
                                    }
                                ]
                                }]}
                              type='bar'/>
                        </div>

                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{color:"#A555EC"}}>영상복습 현황</div>
                            <AChart
                            options= {{
                                colors: ["#20E647"],
                                plotOptions: {
                                    radialBar: {
                                    hollow: {
                                        margin: 0,
                                        size: "70%",
                                        background: "#293450"
                                    },
                                    track: {
                                        dropShadow: {
                                        enabled: true,
                                        top: 2,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.15
                                        }
                                    },
                                    dataLabels: {
                                        name: {
                                        offsetY: -10,
                                        color: "#fff",
                                        fontSize: "13px"
                                        },
                                        value: {
                                        color: "#fff",
                                        fontSize: "30px",
                                        show: true
                                        }
                                    }
                                    }
                                },                              
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                      shade: "dark",
                                      type: "vertical",
                                      gradientToColors: ["#87D4F9"],
                                      stops: [0, 100]
                                    }
                                },
                                labels: ["복습률"]
                              }}
                              series= {[67]}
                              type='radialBar'/>
                        </div>
                
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