import React, { useEffect } from "react";
import wrapper from "/store/configureStore";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaClipboard, FaClock } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko";
import { fetchLecture, fetchStudentLectures } from "../../../../../store/modules/lecturesSlice";
import { fetchLessonVideos, fetchStudentVideoWatchRecords } from "../../../../../store/modules/videosSlice";
import { fetchLectureLessons, fetchLesson, fetchStudentLessons } from "../../../../../store/modules/lessonsSlice";
import { fetchLessonTests, fetchStudentTestRecords } from "../../../../../store/modules/testsSlice";
import { createAttendance, fetchStudentAttendances } from "../../../../../store/modules/attendancesSlice";
import { fetchStudentEnrolls } from "../../../../../store/modules/enrollsSlice";
import VideoListCard from "../../../../../components/Common/VideoListCard";
import AttachmentListCard from "../../../../../components/Common/AttachmentListCard";
import CommentCard from "../../../../../components/Common/CommentCard";
import { fetchLessonAttachments } from "../../../../../store/modules/attachmentsSlice";
import { fetchStudents } from "../../../../../store/modules/studentsSlice";
import { fetchLessonQuestions } from "../../../../../store/modules/questionsSlice";

const ClientLessonDetailPage = ({ lectureData, studentsData, lessonData, lessonsData,
    upcomingLessonsData, completedLessonsData, videosData }) => {
    const userData = useSelector(state => state.accounts.userData);
    const dispatch = useDispatch();
    const student_pk = 0;
    const videoWatchRecordsData = useSelector(state => state.videos.videoWatchRecordsData);
    const attendancesData = useSelector(state => state.attendances.attendancesData);
    const days = ['월','화','수','목','금','토','일']
    const attendanceData = useSelector(state => state.attendances.attendanceData);

    useEffect(() => {
        if (userData.role == 'S') {
            student_pk = studentsData.find(student => student.name == userData.name && student.phone_number == userData.phone_number).id;
            dispatch(fetchStudentTestRecords(student_pk));
            dispatch(fetchStudentAttendances(student_pk));
            dispatch(fetchStudentVideoWatchRecords(student_pk));
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

    // 해당 수업 출석 여부
    const lesson_attended = null;
    try{ lesson_attended = attendancesData.find(attendance=>attendance.lesson.id==lessonData.id).attend;}
    catch{ lesson_attended = null; }
    
    //출석 가능시간
    const attendable_time = false;
    
    if(moment().format('yyyy-MM-DD HH:mm')>lessonData.date+" "+lessonData.start_time 
    && moment().format('yyyy-MM-DD HH:mm')<lessonData.date+" "+lessonData.end_time){
        attendable_time = true;
    }

    //출석
    const attendHandler = () =>{
        dispatch(createAttendance({"student": studentsData.find(student => student.name == userData.name && student.phone_number == userData.phone_number).id
        , "attend": true, "lesson": lessonData.id}))
    }

    useEffect(()=>{
        student_pk=studentsData.find(student => student.name == userData.name && student.phone_number == userData.phone_number).id
        dispatch(fetchStudentAttendances(student_pk));
    },[attendanceData]);

    return (
        <div>
        <div>
            <div className="client-greeting ms-4 mt-2">나의 강의실</div>
        </div>
        <div className="m-4">

            <div className="row">
                <div className="col-lg-3">                    
                        <div className="card">
                            <div className="card-header bg-transparent">
                                <div className="justify-content-between d-flex align-items-baseline">
                                    <div className="font-size-15 fw-semibold">{lessonData.date} 일자 수업</div>
                                    {lessonData.done ?
                                    <div className="badge badge-soft-success me-2 mb-2">진행완료</div>   
                                    :<div className="badge badge-soft-danger me-2 mb-2">미진행</div>  
                                    } 
                                </div>                          
                            </div>
                            <div className="card-body">                                
                                <div className="row task-dates">
                                    <div className="col-6">
                                        <h5 className="font-size-14"><i className="me-1 text-primary"><FaClock /></i> 수업 시작</h5>
                                        <h5 className="text-muted mb-0">{moment(lessonData.start_time, "HH:mm").format("A hh:mm")}</h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 className="font-size-14"><i className="me-1 text-primary"><FaClock /></i> 수업 종료</h5>
                                        <h5 className="text-muted mb-0">{moment(lessonData.end_time, "HH:mm").format("A hh:mm")}</h5>
                                    </div>
                                </div>                            
                            </div>  
                        </div>                    
                </div>
                <div className="col-lg-3">
                    <div className={lesson_attended==null?(
                                'card bg-warning'
                            )
                            :(lesson_attended?'card bg-success':'card bg-danger')
                            }>
                        <div className="card-body">
                            <div className="font-size-16 fw-semibold text-white">
                            {lesson_attended==null?(
                                attendable_time?
                                <div>
                                    <button className="btn btn-primary me-2" onClick={attendHandler}>출석하기</button>
                                    <span className=" font-size-14">출석가능한 시간이 
                                    <span className="text-primary ms-1 me-1">
                                    {Math.round(-moment.duration(moment().diff(lessonData.date+" "+lessonData.end_time)).asMinutes())}분
                                    </span>
                                    남았습니다</span> 
                                </div>
                                :'출석 입력이 되지 않았습니다.'
                            )
                            :(lesson_attended?'출석이 완료되었습니다':'결석 처리되었습니다')
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <VideoListCard title="강의영상" lessonData={lessonData}/>
                    <AttachmentListCard title="참고자료" />
                    <CommentCard title="질문/답변" lessonData={lessonData} />
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-header mb-3">
                            <h5 className="my-0 text-danger">다른일자 수업보기</h5>
                        </div>
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

ClientLessonDetailPage.layout = "L2";

export default ClientLessonDetailPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const lessonId = { ...etc }.query.lessonId;
    const lectureId = { ...etc }.query.id;
    await store.dispatch(fetchLecture(lectureId));
    await store.dispatch(fetchLectureLessons(lectureId));
    await store.dispatch(fetchLesson(lessonId));
    await store.dispatch(fetchLessonAttachments(lessonId));
    await store.dispatch(fetchLessonVideos(lessonId));
    await store.dispatch(fetchLessonTests(lessonId));    
    await store.dispatch(fetchLessonVideos(lessonId));
    await store.dispatch(fetchLessonQuestions(lessonId));
    await store.dispatch(fetchStudents());
    const studentsData = store.getState().students.studentsData;
    const lectureData = store.getState().lectures.lectureData;
    const lessonData = store.getState().lessons.lessonData;
    const lessonsData = store.getState().lessons.lessonsData;
    const upcomingLessonsData = store.getState().lessons.upcomingLessonsData.slice(0, 3);
    const completedLessonsData = store.getState().lessons.completedLessonsData;
    const videosData = store.getState().videos.videosData;

    return { props: { lectureData, studentsData, lessonData, lessonsData,
         upcomingLessonsData, completedLessonsData, videosData }, };
});