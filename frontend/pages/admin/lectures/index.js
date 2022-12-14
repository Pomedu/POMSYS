import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { deleteLecture, fetchLectures, fetchTeacherLectures, searchLectures } from "../../../store/modules/lecturesSlice";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { useRouter } from "next/router";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { modalOpen, setModalId } from "../../../store/modules/modalSlice";
import { useCookies } from 'react-cookie';
import { fetchTeachers } from "../../../store/modules/teachersSlice";
import wrapper from "../../../store/configureStore";

const AdminLectureListPage = ({teachersData}) => {
    const lecturesData = useSelector(state => state.lectures.lecturesData);
    const filteredLecturesData = useSelector(state => state.lectures.filteredLecturesData);
    const router = useRouter()
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.accounts.userData);
    const teacher_pk = 0;
    // Data Fetch (Lectures)
    useEffect(() => {
        if(userData.role){
            if(userData.role=='A'){
                dispatch(fetchLectures())
                .unwrap()
                .catch(error => {
                    console.log("### error: ", error);
                });
            } else {
                teacher_pk = teachersData.find(teacher=>teacher.name==userData.name&&teacher.phone_number==userData.phone_number).id;
                dispatch(fetchTeacherLectures(teacher_pk))
                .unwrap()
                .catch(error => {
                    console.log("### error: ", error);
                });
            }
        }        
    }, []);

    // Set Columns 
    const columnData = [
        {
            name: '?????????',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: '??????',
            selector: row => row.teacher,
            sortable: true,
        },
        {
            name: '?????????',
            selector: row => row.start_date,
            sortable: true,
        },
        {
            name: '?????????',
            selector: row => row.end_date,
            sortable: true,
        },
        {
            name: '??????',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: '?????????',
            selector: row => String(row.students.length) + "???",
            sortable: true,
        },
        {
            name: '??????',
            cell: (row) => (<span style={{ display: 'flex' }}>
                {userData.role=='A'?<a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => deleteButtonHandler(row.id, row.name)}><FaTrashAlt/></a>:<></>}
                <a className="badge badge-soft-success me-1 font-size-12" onClick={() => router.push(`lectures/${row.id}`)}><FaEdit/></a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    // Expanded Component
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">????????????</div>
                    <div className="card-title-desc">{data.coursetime.map((ct, index) => {
                        const day = moment().weekday(ct.day).format('dddd');
                        const start_time = moment(ct.start_time, "HHmm").format("HH:mm");
                        const end_time = moment(ct.end_time, "HHmm").format("HH:mm");
                        return <span key={index}>{day}:{start_time}~{end_time}, </span>
                    })}
                    </div>
                    <div className="card-title">????????????</div>
                    <div className="card-title-desc">{data.description}</div>
                    <div className="card-title">????????????</div>
                    <div className="card-title-desc">{data.textbook.map((book, index) => {
                        return <span key={index}>{book}, </span>
                    })}</div>
                    <div className="card-title">?????????</div>
                    <div className="card-title-desc">{data.cost}???</div>
                </div>
            </div>);
    };

    // Data Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchLectures(filterText));
    }, [filterText]);

    // Data Delete
    const deleteModalOpen = useSelector((state)=>state.modal.show);
    const [deleteId,setDeleteId] = useState("");
    const [deleteName,setDeleteName] = useState("");
    const deleteButtonHandler = (id, name) =>{
        setDeleteId(id);
        setDeleteName(name);
        dispatch(modalOpen('lectureDeleteModal'));
    }

    const onDelete = (e, lectureId) => {
        e.preventDefault();
        dispatch(deleteLecture(lectureId)).unwrap().then(response => console.log("?????????????????????"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    return (
        <div className="">
            <ContentTitle title="?????? ?????????" mainTitle="?????? ??????" />
            <div className="card">
                <div className="card-body">
                {userData.role=='T'?<div className="text-info">??????????????? ???????????? ????????? ???????????????.</div>:<></>}
                    <div className="row mt-3">
                        <div className="col-4">
                            <Link href={'/admin/lectures/create/'}>
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
                            data={filteredLecturesData}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            defaultSortFieldId={3} // ???????????? ??????
                        />
                    </div>
                </div>
            </div>
            <DeleteModal 
                Id={deleteId}
                Name={deleteName} 
                ModalOpen={deleteModalOpen}
                onChange={onDelete}
                modalId={'lectureDeleteModal'}
                />
        </div>
    )

}

AdminLectureListPage.layout = "L1";

export default AdminLectureListPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {

    await store.dispatch(fetchTeachers());
    const teachersData = store.getState().teachers.teachersData;
    
    return { props: { teachersData }, };

});