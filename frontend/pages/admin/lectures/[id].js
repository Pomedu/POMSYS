import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import UpdateLectureForm from "../../../components/Forms/UpdateLectureForm";
import { fetchLecture } from "../../../store/modules/lecturesSlice";
import wrapper from "../../../store/configureStore";

const AdminLectureUpdatePage = (props) => {
    const lectureData = useSelector(state=>state.lectures.lectureData) 
    return (
        <div>
            <ContentTitle title="강의 수정" mainTitle="강의 관리" />
            <div className="card">
                <div className="card-body">
                    <UpdateLectureForm lectureData={lectureData}/>
                </div>
            </div>
        </div>
    );
};

AdminLectureUpdatePage.layout = "L1";

export default AdminLectureUpdatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) =>{
    const id = {...etc}.query.id
    await store.dispatch(fetchLecture(id))
  });