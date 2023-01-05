
import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherStudents } from "../../../store/modules/studentsSlice";

const TeacherStudentStatisticsCard = (props) => {   
    const teacher_pk = 0;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(props.userData.role=='T'){
            teacher_pk = props.teachersData.find(teacher=>teacher.name==props.userData.name&&teacher.phone_number==props.userData.phone_number).id;
            dispatch(fetchTeacherStudents(teacher_pk));
        }
    },[])

    const studentsData = useSelector(state=>state.students.studentsData);

    return (
    <div className="card">
        <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                        <BiUser/>
                    </span>
                </div>
                <h5 className="font-size-14 mb-0">전체 학생</h5>
            </div>
            <div className="text-muted mt-4">
                <h4>{studentsData.length} 명</h4>
                <div>
                    <span className="badge badge-soft-success font-size-12 me-1"> 지곡점: {studentsData.filter(student=>student.branch=="지곡").length}</span> 
                    <span className="badge badge-soft-warning font-size-12 me-1"> 센텀점: {studentsData.filter(student=>student.branch=="센텀").length}</span>                                              
                </div>
            </div>  
        </div>
    </div>
    );
};

export default TeacherStudentStatisticsCard