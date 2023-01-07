import React, { useEffect, useMemo } from "react";
import { fetchLecture } from "/store/modules/lecturesSlice";
import wrapper from "/store/configureStore";
import { fetchLectureLessons } from "/store/modules/lessonsSlice";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { fetchStudents } from "../../../../store/modules/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentLectures } from "../../../../store/modules/lecturesSlice";
import { fetchStudentLessons } from "../../../../store/modules/lessonsSlice";
import { fetchStudentVideos, fetchStudentVideoWatchRecords } from "../../../../store/modules/videosSlice";
import { fetchStudentTestRecords } from "../../../../store/modules/testsSlice";
import { fetchStudentAttendances } from "../../../../store/modules/attendancesSlice";
import { fetchStudentEnrolls } from "../../../../store/modules/enrollsSlice";
import AttendanceStatusCard from "../../../../components/Dashboards/Clients/AttendanceStatus";
import TestScoresStatusCard from "../../../../components/Dashboards/Clients/TestScoresStatus";
import VideoWatchStatusCard from "../../../../components/Dashboards/Clients/VideoWatchStatus";
import LatestVideoCard from "../../../../components/Dashboards/Clients/LatestVideos";
import { FaClipboard, FaClock } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";
import randomColor from "randomcolor";

const ClientLectureDetailPage = ({ lectureData, upcomingLessonsData, completedLessonsData, studentsData }) => {
    const userData = useSelector(state => state.accounts.userData);
    const dispatch = useDispatch();
    const student_pk = 0;
    const lecturesData = useSelector(state => state.lectures.lecturesData);
    const lessonsData = useSelector(state => state.lessons.lessonsData);
    const enrollsData = useSelector(state => state.enrolls.enrollsData);
    const videosData = useSelector(state => state.videos.videosData);
    const videoWatchRecordsData = useSelector(state => state.videos.videoWatchRecordsData);
    const attendancesData = useSelector(state => state.attendances.attendancesData);
    const days = ['월','화','수','목','금','토','일']
    const colors = randomColor({count: 10, seed:0});

    useEffect(() => {
        if (userData.role == 'S') {
            student_pk = studentsData.find(student => student.name == userData.name && student.phone_number == userData.phone_number).id;
            dispatch(fetchStudentLectures(student_pk));
            dispatch(fetchStudentVideos(student_pk));
            dispatch(fetchStudentLessons(student_pk));
            dispatch(fetchStudentTestRecords(student_pk));
            dispatch(fetchStudentAttendances(student_pk));
            dispatch(fetchStudentVideoWatchRecords(student_pk));
            dispatch(fetchStudentEnrolls(student_pk));
        }
    }, [])
    // Set Columns 
    const columnData = [
            {
                name: '수업일',
                selector: row => row.date,
                width: "120px"
            },
            {
                name: '진행 여부',
                cell: (row) => <div className={row.done ? "badge badge-soft-success" : "badge badge-soft-danger"}>
                    {row.done ? "진행완료" : "미진행"}
                </div>
            },
            {
                name: '출석 여부',
                cell: (row) => <div className={attendancesData.find(attendance=>attendance.lesson.date==row.date)? 
                (attendancesData.find(attendance=>attendance.lesson.date==row.date).attend?"badge badge-soft-success":"badge badge-soft-danger") : "badge badge-soft-warning"}>
                    {attendancesData.find(attendance=>attendance.lesson.date==row.date)? 
                    (attendancesData.find(attendance=>attendance.lesson.date==row.date).attend?"출석":"결석"): 
                    "미기입"}
                </div>
            },
        ];
    const router = useRouter();
    const rowClickHandler = (row, event) => {
        event.preventDefault();
        router.push(`/client/lectureroom/${lectureData.id}/lessons/${row.id}`)
    }

    return (
        <div>
            <div className="m-4">
                <div className="client-greeting">나의강의실 </div>
                <h4 className="text-info">[{lectureData.name}]</h4>
            </div>

            <div className="m-4">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="card">
                                    <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}>
                                        <FaClock/> Time Information
                                    </div> 
                                    <div className="card-body">
                                        <div className="row">
                                        {lectureData.coursetime.map(time=>{return(
                                            <div className="col-lg-4 mb-2">
                                                <div className="px-2 mb-2 font-size-14 fw-semibold bg-soft bg-info">{days[time.day]}요일</div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h5 className="font-size-14"><i className="me-1 text-primary"><FaClock /></i> 수업 시작</h5>
                                                        <h5 className="text-muted mb-0">{moment(time.start_time, "HH:mm").format("A hh:mm")}</h5>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className="font-size-14"><i className="me-1 text-primary"><FaClock /></i> 수업 종료</h5>
                                                        <h5 className="text-muted mb-0">{moment(time.end_time, "HH:mm").format("A hh:mm")}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        )})} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <LatestVideoCard
                            videoWatchRecordsData={videoWatchRecordsData.filter(record=>record.video.lesson.lecture==lectureData.name)}
                            videosData={videosData.filter(video=>video.lesson.lecture==lectureData.name)}/>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <AttendanceStatusCard
                                    attendancesData={attendancesData.filter(attendance=>attendance.lesson.lecture.id==lectureData.id)}
                                    lessonsData={lessonsData.filter(lesson=>lesson.lecture.id==lectureData.id)}
                                    enrollsData={enrollsData.filter(enroll=>enroll.lecture.id==lectureData.id)} />
                            </div>
                            <div className="col-lg-4">
                                <TestScoresStatusCard />
                            </div>
                            <div className="col-lg-4">
                                <VideoWatchStatusCard
                                    videoWatchRecordsData={videoWatchRecordsData.filter(record=>record.video.lesson.lecture==lectureData.name)}
                                    videosData={videosData.filter(video=>video.lesson.lecture==lectureData.name)}
                                    enrollsData={enrollsData.filter(enroll=>enroll.lecture.id==lectureData.id)}
                                />
                            </div>
                        </div>
                    </div>                    
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-2">미진행 수업</h4>
                                <div>
                                    <DataTable
                                        columns={columnData}
                                        data={upcomingLessonsData}
                                        defaultSortFieldId={1}
                                        highlightOnHover
                                        pointerOnHover
                                        onRowClicked={rowClickHandler}
                                    />
                                    <h4 className="card-title mb-2 mt-3">완료된 수업</h4>
                                    <div>
                                        <DataTable
                                            columns={columnData}
                                            data={completedLessonsData}
                                            defaultSortFieldId={1}
                                            defaultSortAsc={false}
                                            highlightOnHover
                                            pointerOnHover
                                            onRowClicked={rowClickHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ClientLectureDetailPage.layout = "L2";

export default ClientLectureDetailPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const id = { ...etc }.query.id
    await store.dispatch(fetchLecture(id));
    await store.dispatch(fetchLectureLessons(id));
    await store.dispatch(fetchStudents());
    const studentsData = store.getState().students.studentsData;
    const lectureData = store.getState().lectures.lectureData;
    const upcomingLessonsData = store.getState().lessons.upcomingLessonsData.slice(0, 3);
    const completedLessonsData = store.getState().lessons.completedLessonsData;

    return { props: { lectureData, upcomingLessonsData, completedLessonsData, studentsData }, };
});