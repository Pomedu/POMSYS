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
import Script from "next/script";

const AdminEnrollListPage = () => {
    const enrollsList = useSelector(state => state.enrolls.enrollsData);
    const teachersList = useSelector(state => state.teachers.teachersData);
    const [selectedTeacher,setSelectedTeacher] = useState([]);
    const [selectedLecture,setSelectedLecture] = useState("");
    const filteredEnrollsList = useSelector(state => state.enrolls.filteredEnrollsData);
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
            name: '이름',
            selector: row => row.student.name,
        },
        {
            name: '번호(학생)',
            selector: row => row.student.phone_number,
        },
        {
            name: '번호(학부모)',
            selector: row => row.student.phone_number_P,
        },
        {
            name: '등록일',
            selector: row => row.joined_at,
            sortable: true,
        },
        {
            name: '동작',
            cell: (row) => (<span style={{ display: 'flex' }}>
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => onDelete(e, row.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    // Data Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchEnrolls(filterText));
    }, [filterText]);

    // Data Delete
    const onDelete = (e, enrollId) => {
        e.preventDefault();
        dispatch(deleteEnroll(enrollId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    useEffect(() => {
        console.log(selectedTeacher);
        console.log(selectedLecture);
    }, [selectedTeacher]);

    return (
        <div>
            <ContentTitle title="수강 리스트" mainTitle="수강 관리" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">
                            <div className="mb-4">
                                <div className="mb-3">
                                    <Link href={'/admin/enrolls/create/'}>
                                        <div className="btn btn-light w-100">
                                            + New
                                        </div>
                                    </Link>
                                </div>
                            </div>
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
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">{selectedLecture}</h4>
                            <div className="row">
                                <div className="w-100">
                                    <div className="float-end" style={selectedLecture!==""?{}:{display:"none"}}>
                                        <SearchBox onChange={setFilterText} filterText={filterText} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 mt-5">
                                <DataTable
                                    noDataComponent={selectedLecture!==""?"등록된 수강정보가 없습니다.":"강의를 선택해주세요"}
                                    columns={columns}
                                    data={filteredEnrollsList}
                                    pagination
                                    defaultSortFieldId={4} // 등록일로 정렬
                                />
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )

}

AdminEnrollListPage.layout = "L1";

export default AdminEnrollListPage
