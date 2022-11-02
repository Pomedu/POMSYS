import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers } from "../../../store/modules/teachersSlice";
import DataTable from "react-data-table-component";
import "moment/locale/ko"
import moment from "moment/moment";
import SearchBox from "../../../components/Common/SearchBox";
import ContentTitle from "../../../components/Common/ContentTitle";
import { useRouter } from "next/router";
import { fetchLectureLessons } from "../../../store/modules/lessonsSlice";
import { BiUser, BiChevronDown, BiChevronUp, BiChalkboard } from 'react-icons/bi'

const AdminLessonListPage = () => {
    const upcomingLessonsList = useSelector(state => state.lessons.upcomingLessonsData.slice(0,3));
    const completedLessonsList = useSelector(state => state.lessons.completedLessonsData);
    const teachersList = useSelector(state => state.teachers.teachersData);
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [selectedLecture, setSelectedLecture] = useState("");
    const router = useRouter()
    const dispatch = useDispatch();

    // Data Fetch (Lessons)
    useEffect(() => {
        dispatch(fetchTeachers());
    }, []);

    const selectedTeacherHandler = (teacherId) => {
        if (selectedTeacher.includes(teacherId)) {
            setSelectedTeacher(selectedTeacher.filter(function (teacher) { return teacher !== teacherId }));
        } else {
            setSelectedTeacher([...selectedTeacher, teacherId]);
        }
    }
    const selectedLectureHandler = (lectureName, lectureId) => {
        setSelectedLecture(lectureName);
        dispatch(fetchLectureLessons(lectureId));
    }

    // Set Columns 
    const columnData = [
        {   
            name: '수업일',
            selector: row => row.date,
        },
        {
            name: '수업시작',
            selector: row => moment(row.start_time,"HH:mm").format("A hh:mm"),
        },
        {
            name: '수업종료',
            selector: row => moment(row.end_time,"HH:mm").format("A hh:mm"),
        },
        {
            name: '진행 여부',
            cell: (row) => <div className={row.done?"badge badge-soft-success":"badge badge-soft-danger"}>
                {row.done?"진행완료":"미진행"}
            </div>
        },
    ]

    const columns = useMemo(() => columnData, []);

    const rowClickHandler = (row,event) =>{
        event.preventDefault();
        router.push(`/admin/lessons/${row.id}`)
    }

    return (
        <div>
            <ContentTitle title="일일 수업 관리" mainTitle="강의 관리" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">
                            <div className="row">
                                <div className="mb-3">
                                    <Link href={'/admin/lessons/create/'}>
                                        <div className="btn btn-light w-100 waves-effect">
                                            + New
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <ul className="list-unstyled categories-list">
                                {teachersList.map((teacher, teacher_index) => {
                                    return (<li key={teacher_index} className="mb-1" >
                                        <div className="custom-accordion">
                                            <a className="text-body fw-medium py-1 d-flex align-items-center"
                                                onClick={() => selectedTeacherHandler(teacher.id)}>
                                                <i className="font-size-15 text-warning me-2">
                                                    <BiUser color={selectedTeacher.includes(teacher.id) ? "#2A3042" : "#CDCDCD"} />
                                                </i>
                                                {teacher.name}({teacher.subject})
                                                <i className="ms-auto font-size-15">
                                                    {selectedTeacher.includes(teacher.id) ?<BiChevronDown />:<BiChevronUp/>}
                                                </i>
                                            </a>
                                            <div className={selectedTeacher.includes(teacher.id) ? "collapse show mt-2 mb-1" : "collapse"}>
                                                <div className="card border-0 shadow-none ps-2 mb-0">
                                                    <ul className="list-unstyled mb-0">
                                                        {teacher.lectures.map((lecture, lecture_index) => {
                                                            return (<li key={lecture_index} className="mb-2">
                                                                <a onClick={() => selectedLectureHandler(lecture.name, lecture.id)}>
                                                                    <i className="font-size-15 text-warning me-2">
                                                                        <BiChalkboard
                                                                            color={lecture.name == selectedLecture ? "#2A3042" : "#CDCDCD"} />
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
                    <div className={selectedLecture !== "" ? "card border border-success mb-2" : "card border border-danger mb-2"}>
                        <div className="card-header bg-transparent border-danger">
                            <h5 className={selectedLecture !== "" ? "my-0 text-success" : "my-0 text-danger"}>
                                {selectedLecture !== "" ? selectedLecture : "강의를 선택해주세요"}
                            </h5>
                        </div>
                    </div>
                    <div className="card mb-2" style={selectedLecture !== "" ? {} : { display: "none" }}>
                        <div className="card-body">
                            <h4 className="card-title mb-2">Upcoming</h4>
                            <div>
                                <DataTable
                                    noDataComponent={selectedLecture !== "" ? "등록된 수업정보가 없습니다." : "강의를 선택해주세요"}
                                    columns={columns}
                                    data={upcomingLessonsList}
                                    defaultSortFieldId={1}
                                    highlightOnHover
                                	pointerOnHover
                                    onRowClicked={rowClickHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={selectedLecture !== "" ? {} : { display: "none" }}>
                        <div className="card-body">
                            <h4 className="card-title mb-2">Completed</h4>
                            <div>
                                <DataTable
                                    noDataComponent={selectedLecture !== "" ? "등록된 수업정보가 없습니다." : "강의를 선택해주세요"}
                                    columns={columns}
                                    data={completedLessonsList}
                                    defaultSortFieldId={1}                                    
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                	pointerOnHover
                                    onRowClicked={rowClickHandler}
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
