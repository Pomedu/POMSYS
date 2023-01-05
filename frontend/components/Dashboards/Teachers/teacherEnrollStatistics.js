import moment from "moment";
import "moment/locale/ko"
import { useEffect } from "react";
import { BiRegistered } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchTeacherStudents } from "../../../store/modules/studentsSlice";

const TeacherEnrollStatisticsCard = (props) => {  
    const teacher_pk = 0;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(props.userData.role=='T'){
            teacher_pk = props.teachersData.find(teacher=>teacher.name==props.userData.name&&teacher.phone_number==props.userData.phone_number).id;
            dispatch(fetchTeacherStudents(teacher_pk));
            dispatch(fetchTeacherEnrolls(teacher_pk));
        }
    },[])

    const studentsData = useSelector(state=>state.students.studentsData);
    const enrollsData = useSelector(state=>state.enrolls.enrollsData);  

    const monthList = [];
    const subjectsList = [];
    for(var i=11; i>-2; i-- ){
        monthList.push(moment().subtract(i,"M").format('yyyy-MM'));
        subjectsList.push(0);
    }
    
    for(var i=0; i<monthList.length; i++ ){
        for(var j=0; j<enrollsData.length;j++){
            if(moment(enrollsData[j].joined_at).format('yyyy-MM')<=monthList[i]&&monthList[i]<=moment(enrollsData[j].lecture.end_date).format('yyyy-MM')){
                subjectsList[i] += 1;
            }
        }
    }
    return (
    <div className="card">
        <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                        <BiRegistered/>
                    </span>
                </div>
                <h5 className="font-size-14 mb-0">전체 수강등록</h5>
            </div>
            <div className="text-muted mt-4">
                <h4>{subjectsList[11]} 과목</h4>
                <span className="font-size-12 me-1"> 수강생 1명당  
                    <span className="fw-semibold text-primary"> 평균 {Math.round(subjectsList[11]/studentsData.length*10)/10} 과목 </span>
                    수강
                </span> 
            </div>  
        </div>
    </div>
    );
};

export default TeacherEnrollStatisticsCard