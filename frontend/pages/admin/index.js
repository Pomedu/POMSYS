import React, { useEffect } from "react";
import Link from "next/link";
import { fetchLectures, fetchTeacherLectures } from "../../store/modules/lecturesSlice";
import { fetchTeachers } from "../../store/modules/teachersSlice";
import { fetchStudents } from "../../store/modules/studentsSlice";
import { fetchAllEnrolls, fetchEnrolls } from "../../store/modules/enrollsSlice";
import wrapper from "../../store/configureStore";
import ContentTitle from "../../components/Common/ContentTitle";
import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import TeacherStatisticsCard from "../../components/Dashboards/Admins/teacherStatistics";
import StudentStatisticsCard from "../../components/Dashboards/Admins/studentStatistics";
import EnrollStatisticsCard from "../../components/Dashboards/Admins/enrollStatistics";
import LectureStatisticsCard from "../../components/Dashboards/Admins/lectureStatistics";
import SalesTrendCard from "../../components/Dashboards/Admins/SalesTrend";
import SalesRatioCard from "../../components/Dashboards/Admins/SalesRatio";
import TeacherStudentStatisticsCard from "../../components/Dashboards/Teachers/teacherStudentStatistics";
import TeacherLectureStatisticsCard from "../../components/Dashboards/Teachers/teacherLectureStatistics";
import TeacherEnrollStatisticsCard from "../../components/Dashboards/Teachers/teacherEnrollStatistics";
import TeacherSalesTrendCard from "../../components/Dashboards/Teachers/teacherSalesTrend";
import TeacherSalesRatioCard from "../../components/Dashboards/Teachers/teacherSalesRatio";

const AdminPage = ({ lecturesData, teachersData, studentsData, enrollsData}) => {

    const userData = useSelector(state => state.accounts.userData);

    return (
        <div>
            <ContentTitle title="대시보드" mainTitle="홈" />
            {userData.role == "A" ?
                <>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="text-primary"><FaUserCircle size="30" /></span>
                                        <span className="text-primary fw-semibold font-size-16 ms-2">{userData.name}</span>
                                        <span className="font-size-16">님 환영합니다.</span>
                                    </div>
                                    <div>
                                        <h5>관리자</h5>
                                        <p className="text-muted mb-1">연락처: {userData.phone_number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-3">
                                    <Link href={'/admin/teachers'}>
                                        <a>
                                            <TeacherStatisticsCard teachersData={teachersData} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/admin/students'}>
                                        <a>
                                            <StudentStatisticsCard studentsData={studentsData} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/admin/lectures'}>
                                        <a>
                                            <LectureStatisticsCard enrollsData={enrollsData} studentsData={studentsData} lecturesData={lecturesData} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-lg-3">
                                    <Link href={'/admin/enrolls'}>
                                        <a>
                                            <EnrollStatisticsCard enrollsData={enrollsData} studentsData={studentsData} />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8">
                            <SalesTrendCard enrollsData={enrollsData} />
                        </div>
                        <div className="col-xl-4 ">
                            <SalesRatioCard enrollsData={enrollsData} teachersData={teachersData} />
                        </div>
                    </div>
                </> :
                <>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <span className="text-primary"><FaUserCircle size="30" /></span>
                                        <span className="text-primary fw-semibold font-size-16 ms-2">{userData.name}</span>
                                        <span className="font-size-16">님 환영합니다.</span>
                                    </div>
                                    <div>
                                        <h5>강사</h5>
                                        <p className="text-muted mb-1">연락처: {userData.phone_number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">                                
                                <div className="col-lg-4">
                                    <Link href={'/admin/students'}>
                                        <a>
                                            <TeacherStudentStatisticsCard userData={userData} teachersData={teachersData} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-lg-4">
                                    <Link href={'/admin/lectures'}>
                                        <a>
                                        <TeacherLectureStatisticsCard userData={userData} teachersData={teachersData} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="col-lg-4">
                                    <Link href={'/admin/enrolls'}>
                                        <a>
                                        <TeacherEnrollStatisticsCard userData={userData} teachersData={teachersData} />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8">
                            <TeacherSalesTrendCard userData={userData} teachersData={teachersData} />
                        </div>
                        <div className="col-xl-4 ">
                            <TeacherSalesRatioCard userData={userData} teachersData={teachersData} />
                        </div>
                    </div>
                </>
            }

        </div>
    )

}

AdminPage.layout = "L1";

export default AdminPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchLectures());
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchStudents());
    await store.dispatch(fetchAllEnrolls());

    const lecturesData = store.getState().lectures.lecturesData;
    const teachersData = store.getState().teachers.teachersData;
    const studentsData = store.getState().students.studentsData;
    const enrollsData = store.getState().enrolls.enrollsData;
    
    return { props: { lecturesData, teachersData, studentsData, enrollsData }, };

});