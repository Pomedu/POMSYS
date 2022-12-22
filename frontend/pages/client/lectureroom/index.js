import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaYoutube, FaCalendar } from "react-icons/fa";

const ClientLectureRoom = () => {

    return (
        <div>
            <div>
                <div className="client-greeting ms-4 mt-2">나의 강의실</div>
            </div>

            <div className="m-4">
                <div className="font-size-20 text-warning fw-semibold mb-3"> 현재 수강중인 강의 </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card bg-info">
                            <div className="card-body">
                                <div className="text-white">
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
                    <div className="col-lg-3">
                        <div className="card bg-info">
                            <div className="card-body">
                                <div className="text-white">
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
                </div>

            </div>
            <div className="m-4">
                <div className="font-size-20 text-success fw-semibold"> 수강이 종료된 강의 </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mt-3 bg-soft bg-danger">
                            <div className="card-body">
                                <div className="text-white justify-content-between align-middle" style={{ display: 'flex' }}>
                                    <div>
                                        <div className="fw-semibold font-size-16 text-white">
                                            수강이 종료된 강의가 없습니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

ClientLectureRoom.layout = "L2";

export default ClientLectureRoom