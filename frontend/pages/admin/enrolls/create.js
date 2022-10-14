import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import FileManagerCard from "../../../components/Common/FileManagerCard";
import SearchBox from "../../../components/Common/SearchBox";
import CreateEnrollForm from "../../../components/Forms/CreateEnrollForm";
import { createEnroll, resetEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchLecture, fetchTeacherLectures, resetLectures, searchLectures } from "../../../store/modules/lecturesSlice";
import { fetchStudents, searchStudents } from "../../../store/modules/studentsSlice";
import { fetchTeachers, resetTeachers, searchTeachers } from "../../../store/modules/teachersSlice";

const AdminEnrollCreatePage = () => {
    return (
        <div>
            <ContentTitle title="수강 등록" mainTitle="수강 관리" />
            <CreateEnrollForm />
        </div>
    );
};

AdminEnrollCreatePage.layout = "L1";

export default AdminEnrollCreatePage;
