import React from "react";
import Link from "next/link";
import { fetchLectures } from "../../store/modules/lecturesSlice";
import { fetchTeachers } from "../../store/modules/teachersSlice";
import { fetchStudents } from "../../store/modules/studentsSlice";
import { fetchEnrolls } from "../../store/modules/enrollsSlice";

const AdminPage = ({ lecturesData, teachersData, studentsData, enrollsData }) => {
   
    return (
        <div>
            
        </div>
    )

}

AdminPage.layout = "L1";

export default AdminPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchLectures());
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchStudents());;
    await store.dispatch(fetchEnrolls());

    const lecturesData = store.getState().lectures.lecturesData;
    const teachersData = store.getState().teachers.teachersData;
    const studentsData = store.getState().students.studentsData;
    const enrollsData = store.getState().enrolls.enrollsData;

    return { props: { lecturesData, teachersData, studentsData, enrollsData }, };

});