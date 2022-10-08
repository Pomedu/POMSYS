import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import UpdateStudentForm from "../../../components/Forms/UpdateStudentForm";
import wrapper from "../../../store/configureStore";
import { fetchStudent } from "../../../store/modules/studentsSlice";

const AdminStudentUpdatePage = (props) => {
    const studentData = useSelector(state=>state.students.studentData) 
    return (
        <div>
            <ContentTitle title="학생 정보 수정" mainTitle="학생 관리" />
            <div className="card">
                <div className="card-body">
                    <UpdateStudentForm studentData={studentData}/>
                </div>
            </div>
        </div>
    );
};

AdminStudentUpdatePage.layout = "L1";

export default AdminStudentUpdatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) =>{
    const id = {...etc}.query.id
    await store.dispatch(fetchStudent(id))
  });