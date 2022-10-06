import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLectures } from "../../../store/modules/lectures";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const AdminLectureListPage = () => {
    const getLectures = useSelector(state => state.lecturesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLectures())
            .unwrap()
            .then(response => {
            })
            .catch(error => {
                console.log("### error: ", error);
            });

    }, []);

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
            selector: row => String(row.students.length)+"명",
            sortable: true,
        },
        {
            name: '동작',
            cell: () => (<span style={{ display: 'flex' }}>
                <button className="btn-sm btn-danger me-1 "><FontAwesomeIcon icon={faTrashCan}/></button>
                <button className="btn-sm btn-success"><FontAwesomeIcon icon={faEdit}/></button>
                </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

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
                <div className="card-title-desc">{data.textbook.map((book,index)=>{
                    return <span key={index}>{book}, </span>
                })}</div>
                <div className="card-title">수강료</div>
                <div className="card-title-desc">{data.cost}원</div>     
            </div>
        </div>);
    };

    const [filterText, setFilterText] = React.useState('');
    const teacherfliter = getLectures.lectures.filter(item => item.teacher.toLowerCase().includes(filterText.toLowerCase()));
    const namefilter = getLectures.lectures.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
    const filteredItems = Array.from(new Set(teacherfliter.concat(namefilter)));


    return (
        <div>
            <ContentTitle title="강의 리스트" mainTitle="강의 관리"/>
            <div className="card">
                <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <Link href={'/admin/lectures/create/'}>
                                    <div className="btn btn-primary row ms-2">
                                        New
                                    </div>
                                </Link>
                            </div>
                            <div className="col-8">
                                <div className="float-end">
                                <SearchBox onChange={setFilterText} filterText={filterText} />
                                </div>
                            </div>
                        </div>
                    <div>
                        <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLectureListPage.layout = "L1";

export default AdminLectureListPage
