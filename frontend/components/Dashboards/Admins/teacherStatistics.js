
import { BiMale } from "react-icons/bi";

const TeacherStatisticsCard = (props) => {   

    return (<div className="card clickable">
        <div className="card-body">
            <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                        <BiMale />
                    </span>
                </div>
                <h5 className="font-size-14 mb-0">전체 강사</h5>
            </div>
            <div className="text-muted mt-4">
                <h4>{props.teachersData.length} 명</h4>
                <div>
                    <span className="badge badge-soft-success font-size-12 me-1"> 수학: {props.teachersData.filter(teacher => teacher.subject == "수학").length}</span>
                    <span className="badge badge-soft-warning font-size-12 me-1"> 국어: {props.teachersData.filter(teacher => teacher.subject == "국어").length}</span>
                    <span className="badge badge-soft-danger font-size-12 me-1"> 영어: {props.teachersData.filter(teacher => teacher.subject == "영어").length}</span>
                    <span className="badge badge-soft-info font-size-12 me-1"> 과학: {props.teachersData.filter(teacher => teacher.subject == "과학").length}</span>
                    <span className="badge badge-soft-secondary font-size-12 me-1"> 논술: {props.teachersData.filter(teacher => teacher.subject == "논술").length}</span>
                </div>
            </div>
        </div>
    </div>
    );
};

export default TeacherStatisticsCard