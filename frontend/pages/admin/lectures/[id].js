import React from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import UpdateLectureForm from "../../../components/Forms/UpdateLectureForm";
import { fetchLecture } from "../../../store/modules/lecturesSlice";
import wrapper from "../../../store/configureStore";

const AdminLectureUpdatePage = () => {
    
    return (
        <div>
            <ContentTitle title="강의 수정" mainTitle="강의 관리" />
            <div className="card">
                <div className="card-body">
                    <UpdateLectureForm/>
                </div>
            </div>
        </div>
    );
};

AdminLectureUpdatePage.layout = "L1";

export default AdminLectureUpdatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const id = { ...etc }.query.id
    await store.dispatch(fetchLecture(id))
});