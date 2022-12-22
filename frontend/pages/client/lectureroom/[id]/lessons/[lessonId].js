import React, { useMemo } from "react";
import wrapper from "/store/configureStore";
import { fetchLectureLessons } from "/store/modules/lessonsSlice";
import { fetchLesson } from "../../../../../store/modules/lessonsSlice";
import { fetchLessonAttendances } from "../../../../../store/modules/attendancesSlice";
import { fetchLessonAttachments } from "../../../../../store/modules/attachmentsSlice";
import { fetchLessonVideos } from "../../../../../store/modules/videosSlice";
import { fetchLessonTests } from "../../../../../store/modules/testsSlice";
import { fetchEnrolls } from "../../../../../store/modules/enrollsSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../../../../store/modules/modalSlice";
import { BiEdit } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import AttendanceCard from "../../../../../components/Common/AttendanceCard";
import VideoListCard from "../../../../../components/Common/VideoListCard";
import AttachmentListCard from "../../../../../components/Common/AttachmentListCard";
import CommentCard from "../../../../../components/Common/CommentCard";
import DataTable from "react-data-table-component";
import ChangeLessonStatusModal from "../../../../../components/Modals/ChangeLessonStatusModal";
import ChangeLessonTimeModal from "../../../../../components/Modals/ChangeLessonTimeModal";
import moment from "moment";
import "moment/locale/ko"

const ClientLessonDetailPage = ({ lessonData, upcomingLessonsData, completedLessonsData }) => {
    // Set Columns 
    const columnData = [
        {
            name: '수업일',
            selector: row => row.date,
        },
        {
            name: '진행 여부',
            cell: (row) => <div className={row.done ? "badge badge-soft-success" : "badge badge-soft-danger"}>
                {row.done ? "진행완료" : "미진행"}
            </div>
        },
    ]

    const columns = useMemo(() => columnData, []);
    const router = useRouter();
    const rowClickHandler = (row, event) => {
        event.preventDefault();
        router.push(`/admin/lessons/${row.id}`)
    }

    const ModalOpen = useSelector((state) => state.modal.show);
    const dispatch = useDispatch();
    const statusChangeHandler = () => {
        dispatch(modalOpen('lessonStatusUpdateModal'));
    }
    const timeChangeHandler = () => {
        dispatch(modalOpen('lessonTimeUpdateModal'));
    }
    // 진행여부
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
                    <div className="card bg-warning">
                        <div className="card-body">
                            <div className="font-size-16 fw-semibold">출석 입력 시간이 아닙니다.</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <VideoListCard title="강의영상" lessonData={lessonData}/>
                    <AttachmentListCard title="참고자료" />
                    <CommentCard title="질문/답변" comments={[]} />
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
                                    columns={columns}
                                    data={upcomingLessonsData}
                                    defaultSortFieldId={1}
                                    highlightOnHover
                                    pointerOnHover
                                    onRowClicked={rowClickHandler}
                                />
                                <h4 className="card-title mb-2 mt-3">완료된 수업</h4>
                                <div>
                                    <DataTable
                                        columns={columns}
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
            <ChangeLessonStatusModal
                Name={lessonData.date}
                ModalOpen={ModalOpen}
                modalId={'lessonStatusUpdateModal'}
            />
            <ChangeLessonTimeModal
                ModalOpen={ModalOpen}
                modalId={'lessonTimeUpdateModal'}
            />
        </div>
        </div>
    );
};

ClientLessonDetailPage.layout = "L2";

export default ClientLessonDetailPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const lessonId = { ...etc }.query.lessonId;
    await store.dispatch(fetchLesson(lessonId));
    await store.dispatch(fetchLessonAttendances(lessonId));
    await store.dispatch(fetchLessonAttachments(lessonId));
    await store.dispatch(fetchLessonVideos(lessonId));
    await store.dispatch(fetchLessonTests(lessonId));
    const lectureId = store.getState().lessons.lessonData.lecture.id;
    await store.dispatch(fetchLectureLessons(lectureId));
    await store.dispatch(fetchEnrolls(lectureId));

    const lessonData = store.getState().lessons.lessonData;
    const upcomingLessonsData = store.getState().lessons.upcomingLessonsData.slice(0, 3);
    const completedLessonsData = store.getState().lessons.completedLessonsData;

    return { props: { lessonData, upcomingLessonsData, completedLessonsData }, };
});