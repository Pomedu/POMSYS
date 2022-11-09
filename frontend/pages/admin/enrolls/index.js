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
import { BiChalkboard, BiChevronDown, BiChevronUp, BiUser } from 'react-icons/bi'; 
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { useRouter } from "next/router";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { modalOpen } from "../../../store/modules/modalSlice";

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
    const selectedTeacherHandler=(teacherId)=>{
        if(selectedTeacher.includes(teacherId)){
            setSelectedTeacher(selectedTeacher.filter(function(teacher){return teacher !== teacherId}));
        } else {
            setSelectedTeacher([...selectedTeacher,teacherId]);
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
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => deleteButtonHandler(row.id, row.student.name, row.lecture.name)}>
                    <FaTrashAlt />
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
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");
    const deleteButtonHandler = (id, studentName, lectureName) =>{
        setDeleteId(id);
        setDeleteName(lectureName+"에 대한 "+studentName+"의 수강정보");
        dispatch(modalOpen('enrollDeleteModal'));
    }

    const onDelete = (e, enrollId) => {
        e.preventDefault();
        dispatch(deleteEnroll(enrollId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    return (
        <div>
            <ContentTitle title="수강 리스트" mainTitle="수강 관리" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">
                            <div className="row">
                                <div className="mb-3">
                                    <Link href={'/admin/enrolls/create/'}>
                                        <div className="btn btn-light w-100 waves-effect">
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
                                                onClick={()=> selectedTeacherHandler(teacher.id)}>
                                                <i className="font-size-15 text-warning me-2">
                                                    <BiUser color={selectedTeacher.includes(teacher.id)?"#2A3042":"#CDCDCD"}/>
                                                </i>
                                                {teacher.name}({teacher.subject})
                                                <i className="ms-auto font-size-15">
                                                    {selectedTeacher.includes(teacher.id) ?<BiChevronDown />:<BiChevronUp/>}
                                                </i>
                                            </a>
                                            <div className={selectedTeacher.includes(teacher.id)?"collapse show mt-2 mb-1":"collapse"}>
                                                <div className="card border-0 shadow-none ps-2 mb-0">
                                                    <ul className="list-unstyled mb-0">
                                            {teacher.lectures.map((lecture, lecture_index)=>{
                                                return (<li key={lecture_index} className="mb-2">
                                                            <a  onClick={()=>selectedLectureHandler(lecture.name,lecture.id)}>
                                                                <i className="font-size-15 text-warning me-2">
                                                                    <BiChalkboard 
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
                                <div className="col-xl-6 col-sm-6 mt-3">
                                    <div>
                                        <div className="float-end" style={selectedLecture!==""?{}:{display:"none"}}>
                                            <SearchBox onChange={setFilterText} filterText={filterText} />
                                        </div>
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
            <DeleteModal 
                Id={deleteId}
                Name={deleteName} 
                ModalOpen={deleteModalOpen}
                onChange={onDelete}
                modalId={'enrollDeleteModal'}
                />
        </div>
    )

}

AdminEnrollListPage.layout = "L1";

export default AdminEnrollListPage
