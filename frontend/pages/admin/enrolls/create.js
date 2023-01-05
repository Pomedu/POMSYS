import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import FileManagerCard from "../../../components/Common/FileManagerCard";
import SearchBox from "../../../components/Common/SearchBox";
import CreateEnrollForm from "../../../components/Forms/CreateEnrollForm";
import wrapper from "../../../store/configureStore";
import { createEnroll, resetEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchLecture, fetchTeacherLectures, resetLectures, searchLectures } from "../../../store/modules/lecturesSlice";
import { fetchStudents, searchStudents } from "../../../store/modules/studentsSlice";
import { fetchTeachers, resetTeachers, searchTeachers } from "../../../store/modules/teachersSlice";

const AdminEnrollCreatePage = ({teachersData}) => {
    return (
        <div>
            <ContentTitle title="수강 등록" mainTitle="수강 관리" />
            <CreateEnrollForm teachersData={teachersData} />
        </div>
    );
};

AdminEnrollCreatePage.layout = "L1";

export default AdminEnrollCreatePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {

    await store.dispatch(fetchTeachers());
    
    const teachersData = store.getState().teachers.teachersData;
    return { props: { teachersData }, };

});