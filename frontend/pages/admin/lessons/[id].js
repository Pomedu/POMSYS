import React, { useEffect, useMemo } from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import { fetchLectureLessons, fetchLesson } from "../../../store/modules/lessonsSlice";
import wrapper from "../../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import FileListCard from "../../../components/Common/FileListCard";
import CommentCard from "../../../components/Common/CommentCard";
import AttendanceCard from "../../../components/Common/AttendanceCard";
import { fetchLecture } from "../../../store/modules/lecturesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/ko"
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";

const AdminLessonDetailPage = () => {
    const lessonData = useSelector(state => state.lessons.lessonData)
    const upcomingLessonsData = useSelector(state => state.lessons.upcomingLessonsData.slice(0,3))
    const completedLessonsData = useSelector(state => state.lessons.completedLessonsData)

    // Set Columns 
    const columnData = [
        {   
            name: '수업일',
            selector: row => row.date,
        },
        {
            name: '진행 여부',
            cell: (row) => <div className={row.done?"badge badge-soft-success":"badge badge-soft-danger"}>
                {row.done?"진행완료":"미진행"}
            </div>
        },
    ]

    const columns = useMemo(() => columnData, []);
    const router = useRouter();
    const rowClickHandler = (row,event) =>{
        event.preventDefault();
        router.push(`/admin/lessons/${row.id}`)
    }
    return (
        <div className="row">
            <ContentTitle title="일일 수업 관리(상세)" mainTitle="강의 관리" />
            <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                        <div className="flex-grow-1 overflow-hidden">
                            <h5 className="text-truncate font-size-15">{lessonData.lecture.name}</h5>
                            <p className="text-muted">수업일자 - {lessonData.date}</p>
                            <p className="text-muted">강사 - {lessonData.lecture.teacher}</p>
                        </div>
                        <div className="row task-dates">

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row task-dates">
                            <div className="col-6">
                                <h5 className="font-size-14"><i className="me-1 text-primary"><FontAwesomeIcon icon={faClock} /></i> 수업 시작</h5>
                                <h5 className="text-muted mb-0">{moment(lessonData.start_time, "HH:mm").format("A hh:mm")}</h5>
                            </div>
                            <div className="col-6">
                                <h5 className="font-size-14"><i className="me-1 text-primary"><FontAwesomeIcon icon={faClock} /></i> 수업 종료</h5>
                                <h5 className="text-muted mb-0">{moment(lessonData.end_time, "HH:mm").format("A hh:mm")}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <AttendanceCard attendees={lessonData.attendees} totalStudent={lessonData.lecture.students.length} />
                <FileListCard title="참고자료" files={lessonData.tests} />
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
    );
};

AdminLessonDetailPage.layout = "L1";

export default AdminLessonDetailPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const lessonId = { ...etc }.query.id
    await store.dispatch(fetchLesson(lessonId))
    const lectureId = store.getState().lessons.lessonData.lecture.id
    await store.dispatch(fetchLectureLessons(lectureId))
});