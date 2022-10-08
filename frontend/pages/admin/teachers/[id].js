import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import wrapper from "../../../store/configureStore";
import { fetchTeacher } from "../../../store/modules/teachersSlice";

const AdminTeacherUpdatePage = (props) => {
    const teacherData = useSelector(state=>state.teachers.teacherData) 
    return (
        <div>
            <ContentTitle title="학생 정보 수정" mainTitle="학생 관리" />
            <div className="card">
                <div className="card-body">
                    <UpdateTeacherForm teacherData={teacherData}/>
                </div>
            </div>
        </div>
    );
};

AdminTeacherUpdatePage.layout = "L1";

export default AdminTeacherUpdatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) =>{
    const id = {...etc}.query.id
    await store.dispatch(fetchTeacher(id))
  });