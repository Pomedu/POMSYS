import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLectures } from "../../../store/modules/lectures";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";

const AdminLectureListPage = () => {
    const getLectures = useSelector(state => state.lecturesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLectures())
            .unwrap()
            .then(response => {
                console.log("response: ", response);
            })
            .catch(error => {
                console.log("### error: ", error);
            });
        
    }, []);

    const columnData = [
        {
            name: '강의명',
            selector: row => row.name,
        },
        {
            name: '강사',
            selector: row => row.teacher,
        },
        {
            name: '상태',
            selector: row => row.status,
        },
        {
            name: '수강생',
            selector: row => row.students.length,
        },
    ]

    const columns = useMemo(() => columnData, []);
    
    const ExpandedComponent = ({ data }) => {
        return <div>
        <p>개강일: {data.start_date}</p>
        <p>종강일: {data.end_date}</p>
        <p>강의시간</p>
        <div>{data.coursetime.map((ct,index)=>{
            const day = moment().weekday(ct.day).format('dddd');
            const start_time = moment(ct.start_time,"HHmm").format("HH:mm");
            const end_time = moment(ct.end_time,"HHmm").format("HH:mm");
            return <p key={index}>{day}:{start_time}~{end_time}</p>})}</div>
    </div>;
    };

    
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">강의 목록</h4>
                    <div>
                        <div className="btn btn-primary row justify-content-end">
                            <Link href={'/admin/lectures/create/'}>강의생성</Link>
                        </div>
                        <DataTable 
                        columns={columns} 
                        data={getLectures.lectures}
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
