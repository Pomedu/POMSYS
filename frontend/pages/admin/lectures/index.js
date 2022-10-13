import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { deleteLecture, fetchLectures, searchLectures } from "../../../store/modules/lecturesSlice";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const AdminLectureListPage = () => {
    const lecturesList = useSelector(state => state.lectures.lecturesData);
    const filteredLecturesList = useSelector(state => state.lectures.filteredLecturesData);
    const router = useRouter()
    const dispatch = useDispatch();

    // Data Fetch (Lectures)
    useEffect(() => {
        dispatch(fetchLectures())
            .unwrap()
            .catch(error => {
                console.log("### error: ", error);
            });
    }, []);

    // Set Columns 
    const columnData = [
        {
            name: '강의명',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: '강사',
            selector: row => row.teacher,
            sortable: true,
        },
        {
            name: '개강일',
            selector: row => row.start_date,
            sortable: true,
        },
        {
            name: '종강일',
            selector: row => row.end_date,
            sortable: true,
        },
        {
            name: '상태',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: '수강생',
            selector: row => String(row.students.length) + "명",
            sortable: true,
        },
        {
            name: '동작',
            cell: (row) => (<span style={{ display: 'flex' }}>
                <a className="badge badge-soft-danger me-1 font-size-12 " onClick={(e) => onDelete(e, row.id)}><FontAwesomeIcon icon={faTrashCan} /></a>
                <a className="badge badge-soft-success me-1 font-size-12" onClick={() => router.push(`lectures/${row.id}`)}><FontAwesomeIcon icon={faEdit} /></a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

    // Expanded Component
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">강의시간</div>
                    <div className="card-title-desc">{data.coursetime.map((ct, index) => {
                        const day = moment().weekday(ct.day).format('dddd');
                        const start_time = moment(ct.start_time, "HHmm").format("HH:mm");
                        const end_time = moment(ct.end_time, "HHmm").format("HH:mm");
                        return <span key={index}>{day}:{start_time}~{end_time}, </span>
                    })}
                    </div>
                    <div className="card-title">강의설명</div>
                    <div className="card-title-desc">{data.description}</div>
                    <div className="card-title">사용교재</div>
                    <div className="card-title-desc">{data.textbook.map((book, index) => {
                        return <span key={index}>{book}, </span>
                    })}</div>
                    <div className="card-title">수강료</div>
                    <div className="card-title-desc">{data.cost}원</div>
                </div>
            </div>);
    };

    // Data Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchLectures(filterText));
    }, [filterText]);

    // Data Delete
    const onDelete = (e, lectureId) => {
        e.preventDefault();
        dispatch(deleteLecture(lectureId)).unwrap().then(response => console.log("삭제되었습니다"))
            .catch(error => {
                console.log("### error: ", error);
            });
    }

    return (
        <div className="">
            <ContentTitle title="강의 리스트" mainTitle="강의 관리" />
            <div className="card">
                <div className="card-body">
                    <div className="row mt-3">
                        <div className="col-4">
                            <Link href={'/admin/lectures/create/'}>
                                <div className="btn btn-light row ms-2">
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
                            data={filteredLecturesList}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            defaultSortFieldId={3} // 개강일로 정렬
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLectureListPage.layout = "L1";

export default AdminLectureListPage
