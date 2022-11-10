import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers } from "../../../store/modules/teachersSlice";
import "moment/locale/ko"
import ContentTitle from "../../../components/Common/ContentTitle";
import { useRouter } from "next/router";
import { fetchLectureLessons } from "../../../store/modules/lessonsSlice";
import { BiUser, BiChevronDown, BiChevronUp, BiChalkboard } from 'react-icons/bi'

const AdminLectureTimeTablePage = () => {
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

    
    return (
        <div>
            <ContentTitle title="강의 시간표" mainTitle="강의 관리" />
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
                            <h4 className="card-title mb-2">강의 시간표</h4>
                            <div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLectureTimeTablePage.layout = "L1";

export default AdminLectureTimeTablePage