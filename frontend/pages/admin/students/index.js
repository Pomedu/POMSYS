import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents, searchStudents } from "../../../store/modules/studentsSlice";
import ContentTitle from "../../../components/Common/ContentTitle";
import SearchBox from "../../../components/Common/SearchBox";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { useRouter } from "next/router";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { modalOpen } from "../../../store/modules/modalSlice";

const AdminStudentListPage = () => {
    const studentsList = useSelector(state => state.students.studentsData);
    const filteredStudentsList = useSelector(state => state.students.filteredStudentsData);
    const router = useRouter()
    const dispatch = useDispatch();

    // Data Fetch (Students)
    useEffect(() => {
        dispatch(fetchStudents())
            .unwrap()
            .catch(error => {
                console.log("### error: ", error);
            });
    }, []);

    // Set Columns 
    const columnData = [
        {
            name: '학생명',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: '학교',
            selector: row => row.school,
            sortable: true,
        },
        {
            name: '전화번호',
            selector: row => row.phone_number,
        },
        {
            name: '학부모 전화번호',
            selector: row => row.phone_number_P,
        },
        {
            name: '동작',
            cell: (row) => (<span style={{ display: 'flex' }}>
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => deleteButtonHandler(row.id, row.name)}><FaTrashAlt/></a>
                <a className="badge badge-soft-success me-1 font-size-12" onClick={() => router.push(`students/${row.id}`)}><FaEdit/></a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    // Expanded Component
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">진행 수업</div>
                    <div className="card-title-desc">{data.lectures.map((lecture, index) => {
                        return <p key={index}>{lecture.name}</p>
                    })}
                    </div>
                </div>
            </div>);
    };

    // Data Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchStudents(filterText));
    }, [filterText]);

    // Data Delete
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");
    const deleteButtonHandler = (id, name) =>{
        setDeleteId(id);
        setDeleteName(name+" 학생");
        dispatch(modalOpen('studentDeleteModal'));
    }
    const onDelete = (e, studentId) => {
        e.preventDefault();
        dispatch(deleteStudent(studentId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    return (
        <div>
            <ContentTitle title="학생 리스트" mainTitle="학생 관리" />
            <div className="card">
                <div className="card-body">
                    <div className="row mt-3">
                        <div className="col-4">
                            <Link href={'/admin/students/create/'}>
                                <div className="btn btn-light row ms-2 waves-effect">
                                    + New
                                </div>
                            </Link>
                        </div>
                        <div className="col-8">
                            <div className="float-end">
                                <SearchBox onChange={setFilterText} filterText={filterText} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <DataTable
                            columns={columns}
                            data={filteredStudentsList}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                        />
                    </div>
                </div>
            </div>
            <DeleteModal 
                Id={deleteId}
                Name={deleteName} 
                ModalOpen={deleteModalOpen}
                onChange={onDelete}
                modalId={'studentDeleteModal'}
                />
        </div>
    )


}

AdminStudentListPage.layout = "L1";

export default AdminStudentListPage