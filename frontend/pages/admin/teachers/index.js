import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { deleteTeacher, fetchTeachers, searchTeachers } from "../../../store/modules/teachersSlice";
import { useRouter } from "next/router";
import { modalOpen } from "../../../store/modules/modalSlice";
import DeleteModal from "../../../components/Modals/DeleteModal";

const AdminTeacherListPage = () => {
    const teachersList = useSelector(state => state.teachers.teachersData);
    const filteredTeachersList = useSelector(state => state.teachers.filteredTeachersData);
    const router = useRouter()
    const dispatch = useDispatch();

    // Data Fetch (Teachers)
    useEffect(() => {
        dispatch(fetchTeachers())
            .unwrap()
            .catch(error => {
                console.log("### error: ", error);
            });
    }, []);

    // Set Columns 
    const columnData = [
        {
            name: '강사명',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: '과목',
            selector: row => row.subject,
            sortable: true,
        },
        {
            name: '전화번호',
            selector: row => row.phone_number,
        },
        {
            name: '동작',
            cell: (row) => (<span style={{ display: 'flex' }}>
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => deleteButtonHandler(row.id, row.name)}><FaTrashAlt /></a>
                <a className="badge badge-soft-success me-1 font-size-12" onClick={() => router.push(`teachers/${row.id}`)}><FaEdit/></a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    // Expanded Component
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">담당 수업</div>
                    <div className="card-title-desc">{data.lectures.map((lecture, index) => {
                        return <p key={index}>{lecture.name}({lecture.students.length}명), </p>
                    })}
                    </div>
                </div>
            </div>);
    };

    // Data Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchTeachers(filterText));
    }, [filterText]);


    // Data Delete
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");
    const deleteButtonHandler = (id, name) =>{
        setDeleteId(id);
        setDeleteName(name+" 강사");
        dispatch(modalOpen('teacherDeleteModal'));
    }
    const onDelete = (e, teacherId) => {
        e.preventDefault();
        dispatch(deleteTeacher(teacherId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    return (
        <div>
            <ContentTitle title="강사 리스트" mainTitle="강사 관리" />
            <div className="card">
                <div className="card-body">
                    <div className="row mt-3">
                        <div className="col-4">
                            <Link href={'/admin/teachers/create/'}>
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
                            data={filteredTeachersList}
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
                modalId={'teacherDeleteModal'}
                />
        </div>
    )

}

AdminTeacherListPage.layout = "L1";

export default AdminTeacherListPage
