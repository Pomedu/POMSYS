import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import UpdateTeacherForm from "../../../components/Forms/UpdateTeacherForm";
import wrapper from "../../../store/configureStore";
import { fetchTeacher } from "../../../store/modules/teachersSlice";

const AdminTeacherUpdatePage = () => {
    return (
        <div>
            <ContentTitle title="강사 정보 수정" mainTitle="강사 관리" />
            <div className="card">
                <div className="card-body">
                    <UpdateTeacherForm/>
                </div>
            </div>
        </div>
    );
};

AdminTeacherUpdatePage.layout = "L1";

export default AdminTeacherUpdatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    const id = { ...etc }.query.id
    await store.dispatch(fetchTeacher(id))
});