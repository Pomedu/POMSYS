import React from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import { fetchLecture } from "../../../store/modules/lecturesSlice";
import wrapper from "../../../store/configureStore";
import { useSelector } from "react-redux";
import { fetchLectureLessons } from "../../../store/modules/lessonsSlice";

const ClientLectureDetailPage = ({ lectureData, upcomingLessonsData, completedLessonsData }) => {
    return (
        <div>
            <div> 
                <div className="client-greeting ms-4 mt-2">{lectureData.name}</div>
            </div>

            
            <div className="">
                <div className="client-date font-size-20 text-warning m-4"> 미진행 수업 </div>
                <div className="client-card-row m-3">
                    {upcomingLessonsData.map((lesson)=>{
                        return(
                        <div className="card client-card col-lg-3 ms-2 me-2 mb-2" key={lesson.id}>
                            <div className="card-body">
                                <div>{lesson.date} 일자 수업</div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="client-date font-size-20 text-success m-4"> 출석완료 수업 </div>
                <div className="client-card-row m-3">
                 {completedLessonsData.map((lesson)=>{
                    return(
                    <div className="card client-card col-lg-3 bg-success ms-2 me-2 mb-2" key={lesson.id}>
                        <div className="card-body">
                            <div>{lesson.date} 일자 수업</div>
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