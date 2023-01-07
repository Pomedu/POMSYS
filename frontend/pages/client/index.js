import React, { useEffect } from "react";
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
import { fetchStudentAttendances } from "../../store/modules/attendancesSlice";
import { fetchStudentEnrolls } from "../../store/modules/enrollsSlice";
import AttendanceStatusCard from "../../components/Dashboards/Clients/AttendanceStatus";
import TestScoresStatusCard from "../../components/Dashboards/Clients/TestScoresStatus";
import VideoWatchStatusCard from "../../components/Dashboards/Clients/VideoWatchStatus";

const ClientPage = ({ studentsData }) => {
    const userData = useSelector(state => state.accounts.userData);
    const dispatch = useDispatch();
    const student_pk = 0;
    const studentData = useSelector(state => state.students.studentData);
    const lecturesData = useSelector(state => state.lectures.lecturesData);
    const lessonsData = useSelector(state => state.lessons.lessonsData);
    const enrollsData = useSelector(state => state.enrolls.enrollsData);
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
            dispatch(fetchStudentEnrolls(student_pk));
        }
    },[])
    return (
        <div>
            <div> 
                <div className="client-greeting ms-4 mt-2 text-white">안녕하세요, <span className="text-info">{userData.name}</span>님</div> 
                <div className="client-date ms-4 text-white">{moment().format('YYYY년 MM월 DD일')}</div>
            </div>
            <div className="m-4">
                <LatestVideoCard videosData={videosData} videoWatchRecordsData={videoWatchRecordsData}/>
                <CalendarCard lessonsData={lessonsData} colors={colors}/>
                <div className="font-size-20 text-white fw-semibold"> 내가 수강중인 강의 </div>
                <MyLecturesCard lecturesData={lecturesData.filter(lecture=>lecture.status=='진행중')}/>
                <div className="font-size-20 text-white fw-semibold mb-3"> 나의 학습현황 </div>
                <div className="row">
                    <div className="col-lg-3">
                        <AttendanceStatusCard
                            attendancesData={attendancesData}
                            lessonsData={lessonsData}                     
                            enrollsData={enrollsData}/>
                    </div>
                    <div className="col-lg-3">
                        <TestScoresStatusCard/>
                    </div>
                    <div className="col-lg-3">
                        <VideoWatchStatusCard
                            videoWatchRecordsData={videoWatchRecordsData} 
                            videosData={videosData}
                            enrollsData={enrollsData}
                        />
                    </div>
                </div>      
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