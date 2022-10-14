import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { deleteEnroll, fetchEnrolls, searchEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchTeachers } from "../../../store/modules/teachersSlice";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faChalkboard, faChevronDown, faChevronUp, faEdit, faFolder, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const AdminEnrollLessonPage = () => {
    const teachersList = useSelector(state => state.teachers.teachersData);
    const [selectedTeacher,setSelectedTeacher] = useState([]);
    const [selectedLecture,setSelectedLecture] = useState("");
    const router = useRouter()
    const dispatch = useDispatch();

    // Data Fetch (Enrolls)
    useEffect(() => {
        dispatch(fetchTeachers());
    }, []);
    const selectedTeacherHandler=(teacherName)=>{
        if(selectedTeacher.includes(teacherName)){
            setSelectedTeacher(selectedTeacher.filter(function(teacher){return teacher !== teacherName}));
        } else {
            setSelectedTeacher([...selectedTeacher,teacherName]);
        }
    }
    const selectedLectureHandler=(lectureName,lectureId)=>{
        setSelectedLecture(lectureName);
        dispatch(fetchEnrolls(lectureId));
    }

    // Set Columns 
    const columnData = [
        {
            name: '수업일',
            selector: row => row.joined_at,
            sortable: true,
        },
        {
            name: '동작',
            cell: (row) => (<span style={{ display: 'flex' }}>
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => deleteButtonHandler(row.id, row.student.name, row.lecture.name)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    return (
        <div>
            <ContentTitle title="일일 수업 관리" mainTitle="강의 관리" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">
                            <ul className="list-unstyled categories-list">
                                {teachersList.map((teacher, teacher_index)=>{
                            return (<li key={teacher_index} className="mb-1" >
                                        <div className="custom-accordion">
                                            <a className="text-body fw-medium py-1 d-flex align-items-center" 
                                                onClick={()=> selectedTeacherHandler(teacher.name)}>
                                                <i className="font-size-10 text-warning me-2">
                                                    <FontAwesomeIcon icon={faUser} color={selectedTeacher.includes(teacher.name)?"#2A3042":"#CDCDCD"}/>
                                                </i>
                                                {teacher.name}({teacher.subject})
                                                <i className="ms-auto font-size-10">
                                                    <FontAwesomeIcon icon={faChevronDown}/>
                                                </i>
                                            </a>
                                            <div className={selectedTeacher.includes(teacher.name)?"collapse show mt-2 mb-1":"collapse"}>
                                                <div className="card border-0 shadow-none ps-2 mb-0">
                                                    <ul className="list-unstyled mb-0">
                                            {teacher.lectures.map((lecture, lecture_index)=>{
                                                return (<li key={lecture_index} className="mb-2">
                                                            <a  onClick={()=>selectedLectureHandler(lecture.name,lecture.id)}>
                                                                <i className="font-size-10 text-warning me-2">
                                                                    <FontAwesomeIcon icon={faChalkboard} 
                                                                        color={lecture.name==selectedLecture?"#2A3042":"#CDCDCD"}/>
                                                                </i>
                                                                {lecture.name}
                                                            </a>
                                                        </li>)
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-100">              
                    <div className="card border border-danger" style={selectedLecture !== "" ? { display: "none" }:{}}> 
                        <div className="card-header bg-transparent border-danger">
                            <h5 className="my-0 text-danger">강의를 선택해주세요</h5>
                        </div>     
                    </div>         
                    <div className="card" style={selectedLecture !== "" ? {} : { display: "none" }}>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-xl-6 col-sm-6 mt-3">
                                    <div className="mt-2">
                                        <h5>{selectedLecture}</h5>
                                    </div>
                                </div>
                            </div>                
                            <div className="mb-5 mt-5">
                                <DataTable
                                    noDataComponent={selectedLecture!==""?"등록된 수업정보가 없습니다.":"강의를 선택해주세요"}
                                    columns={columns}
                                    data={filteredLessonsList}
                                    pagination
                                    defaultSortFieldId={1} // 수업일로 정렬
                                />
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )

}

AdminLessonListPage.layout = "L1";

export default AdminLessonListPage
