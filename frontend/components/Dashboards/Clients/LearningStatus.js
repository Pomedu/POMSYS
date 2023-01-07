
import { useState } from "react";
import { BiMale } from "react-icons/bi";
import { FaDoorOpen, FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import FsLightbox from 'fslightbox-react';
import Link from "next/link";
import AChart from "../../Common/AChart";

const LearningStatusCard = (props) => {

    console.log(props.attendancesData);
    
    console.log(props.lessonsData);

    return (
        <div>
            <div className="font-size-20 text-white fw-semibold"> 나의 학습현황 </div>
            <div className="card mt-3 bg-dark">
                <div className="card-body">
                    <div className="row">
                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{ color: "#FFD058" }}>출석현황</div>
                            <AChart options={{
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
                                series={[67]}
                                type='radialBar' />
                        </div>
                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{ color: "#5CB8E4" }}>테스트 점수</div>
                            <AChart
                                options={{
                                    plotOptions: {
                                        bar: {
                                            horizontal: true,
                                        }
                                    },
                                    colors: ['#00E396'],
                                    dataLabels: {
                                        formatter: function (val, opt) {
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
                                series={[{
                                    name: "실제점수",
                                    data: [
                                        {
                                            x: '2011',
                                            y: 12,
                                            goals: [{
                                                name: '평균',
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
                                                name: '평균',
                                                value: 54,
                                                strokeWidth: 5,
                                                strokeHeight: 10,
                                                strokeColor: '#775DD0'
                                            }]
                                        }
                                    ]
                                }]}
                                type='bar' />
                        </div>

                        <div className='mb-3 col-lg-4'>
                            <div className="fw-semibold font-size-14 mb-2" style={{ color: "#A555EC" }}>영상복습 현황</div>
                            <AChart
                                options={{
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
                                series={[67]}
                                type='radialBar' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningStatusCard