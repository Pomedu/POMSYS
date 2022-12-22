import React from "react";
import { fetchLecture } from "/store/modules/lecturesSlice";
import wrapper from "/store/configureStore";
import { fetchLectureLessons } from "/store/modules/lessonsSlice";

const ClientLectureDetailPage = ({ lectureData, upcomingLessonsData, completedLessonsData }) => {
    return (
        <div>
            <div> 
                <div className="client-greeting ms-4 mt-2">나의강의실 / {lectureData.name}</div>
            </div>

            
            <div className="m-4">
                <div className="client-date font-size-20 text-warning mb-3"> 미진행 수업 </div>
                <div className="row">
                    {upcomingLessonsData.map((lesson)=>{
                        return(
                            <div className="col-lg-3">
                                <div className="card" key={lesson.id}>
                                    <div className="card-body">
                                        <div className="fw-semibold font-size-16">{lesson.date} 일자 수업</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="client-date font-size-20 text-success mb-3"> 지난 수업 </div>
                <div className="row">
                 {completedLessonsData.map((lesson)=>{
                    return(
                        <div className="col-lg-3">
                            <div className="card" key={lesson.id}>
                                <div className="card-body">
                                    <div className="justify-content-between d-flex align-items-center">
                                        <div className="fw-semibold font-size-16">{lesson.date} 일자 수업</div>
                                        <div className="badge badge-soft-success float-end">출석</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
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

    const lectureData = store.getState().lectures.lectureData;
    const upcomingLessonsData = store.getState().lessons.upcomingLessonsData.slice(0, 3);
    const completedLessonsData = store.getState().lessons.completedLessonsData;

    return { props: { lectureData, upcomingLessonsData, completedLessonsData }, };
});