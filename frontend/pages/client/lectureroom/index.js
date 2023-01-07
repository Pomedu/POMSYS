import React, { useEffect } from "react";
import wrapper from "../../../store/configureStore";
import { fetchStudents } from "../../../store/modules/studentsSlice";
import { fetchStudentLectures } from "../../../store/modules/lecturesSlice";
import { useDispatch, useSelector } from "react-redux";
import MyLecturesCard from "../../../components/Dashboards/Clients/MyLectures";

const ClientLectureRoom = ({ studentsData }) => {
    const userData = useSelector(state => state.accounts.userData);
    const dispatch = useDispatch();
    const student_pk = 0;    
    const lecturesData = useSelector(state => state.lectures.lecturesData);

    useEffect(()=>{
        if(userData.role=='S'){
            student_pk = studentsData.find(student=>student.name==userData.name&&student.phone_number==userData.phone_number).id;         
            dispatch(fetchStudentLectures(student_pk));            
        }
    },[])
    return (
        <div>
            <div>
                <div className="client-greeting ms-4 mt-2">나의 강의실</div>
            </div>
            <div className="m-4">
                <div className="font-size-20 text-warning fw-semibold"> 내가 수강중인 강의 </div>
                <MyLecturesCard lecturesData={lecturesData.filter(lecture=>lecture.status=='진행중')}/>
            </div>
            <div className="m-4">
                <div className="font-size-20 text-success fw-semibold"> 수강이 종료된 강의 </div>
                <MyLecturesCard lecturesData={lecturesData.filter(lecture=>lecture.status=='종강')}/>               
            </div>
        </div>
    )

}

ClientLectureRoom.layout = "L2";

export default ClientLectureRoom

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchStudents());
    const studentsData = store.getState().students.studentsData;        
    return { props: { studentsData }, };
});