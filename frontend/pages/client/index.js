import React, { useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCalendar } from "react-icons/fa";
import AChart from '../../components/Common/AChart';
import moment from "moment";
import "moment/locale/ko"
import { useDispatch, useSelector } from "react-redux";
import LatestVideoCard from "../../components/Dashboards/Clients/LatestVideos";
import wrapper from "../../store/configureStore";
import { fetchStudentLectures } from "../../store/modules/lecturesSlice";
import { fetchStudentLessons } from "../../store/modules/lessonsSlice";
import { fetchStudentTestRecords } from "../../store/modules/testsSlice";
import { fetchStudentVideos, fetchStudentVideoWatchRecords } from "../../store/modules/videosSlice";
import { fetchStudents } from "../../store/modules/studentsSlice";
import CalendarCard from "../../components/Dashboards/Clients/Calendar";
import randomColor from "randomcolor";
import MyLecturesCard from "../../components/Dashboards/Clients/MyLectures";
import LearningStatusCard from "../../components/Dashboards/Clients/LearningStatus";
import { fetchStudentAttendances } from "../../store/modules/attendancesSlice";

const ClientPage = ({ studentsData }) => {
    const userData = useSelector(state => state.accounts.userData);
    const dispatch = useDispatch();
    const student_pk = 0;
    const studentData = useSelector(state => state.students.studentData);
    const lecturesData = useSelector(state => state.lectures.lecturesData);
    const lessonsData = useSelector(state => state.lessons.lessonsData);
    const videosData = useSelector(state => state.videos.videosData);
    const videoWatchRecordsData = useSelector(state => state.videos.videoWatchRecordsData);
    const attendancesData =  useSelector(state => state.attendances.attendancesData);
    const colors = randomColor({count: 10, seed:0});

    useEffect(()=>{
        if(userData.role=='S'){
            student_pk = studentsData.find(student=>student.name==userData.name&&student.phone_number==userData.phone_number).id;         
            dispatch(fetchStudentLectures(student_pk));
            dispatch(fetchStudentLessons(student_pk));
            dispatch(fetchStudentVideos(student_pk));
            dispatch(fetchStudentTestRecords(student_pk));
            dispatch(fetchStudentAttendances(student_pk));
            dispatch(fetchStudentVideoWatchRecords(student_pk));
        }
    },[])
    return (
        <div>
            <div> 
                <div className="client-greeting ms-4 mt-2 text-white">안녕하세요, <span className="text-info">{userData.name}</span>님</div> 
                <div className="client-date ms-4 text-white">{moment().format('YYYY년 MM월 DD일')}</div>
            </div>
            <div className="m-4">
                <LatestVideoCard videosData={videosData}/>
                <CalendarCard lessonsData={lessonsData} colors={colors}/>
                <MyLecturesCard lecturesData={lecturesData}/>
                <LearningStatusCard 
                    attendancesData={attendancesData}
                    lessonsData={lessonsData} 
                    videoWatchRecordsData={videoWatchRecordsData} 
                    videosData={videosData}
                />
            </div>
        </div>
    )

}

ClientPage.layout = "L2";

export default ClientPage


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchStudents());
    const studentsData = store.getState().students.studentsData;        
    return { props: { studentsData }, };
});