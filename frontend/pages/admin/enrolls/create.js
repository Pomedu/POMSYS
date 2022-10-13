import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import ContentTitle from "../../../components/Common/ContentTitle";
import FileManagerCard from "../../../components/Common/FileManagerCard";
import SearchBox from "../../../components/Common/SearchBox";
import { fetchLecture, fetchTeacherLectures, resetLectures, searchLectures } from "../../../store/modules/lecturesSlice";
import { fetchStudents, searchStudents } from "../../../store/modules/studentsSlice";
import { fetchTeachers, resetTeachers, searchTeachers } from "../../../store/modules/teachersSlice";

const AdminEnrollCreatePage = () => {
    // 강사 목록 가져오기
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
    // 강사 Filtering
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(searchTeachers(filterText));
    }, [filterText]);


    //강사 Select 해서 강의목록 가져오기
    const lecturesList = useSelector(state => state.lectures.lecturesData);
    const filteredLecturesList = useSelector(state => state.lectures.filteredLecturesData);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    useEffect(() => {
        if (selectedTeacher !== "") {
            dispatch(fetchTeacherLectures(selectedTeacher));
            setFilterText("")
        } 
    }, [selectedTeacher])

    // 강의 Filtering
    useEffect(() => {
        dispatch(searchLectures(filterText));
    }, [filterText]);

    //강의 Select하기
    const [selectedLecture, setSelectedLecture] = useState("");
    const lectureData = useSelector(state => state.lectures.lectureData);

    useEffect(()=>{
        if(selectedLecture!==""){
            dispatch(fetchLecture(selectedLecture));
        }
    },[selectedLecture])

    //강사 재선택하기
    function resetLectureHandler(){
        dispatch(resetLectures());
        setSelectedTeacher("");
        setSelectedLecture("");
    }
    
    // 학생 선택하기
    const studentsList = useSelector(state => state.students.studentsData);
    const filteredStudentsList = useSelector(state => state.students.filteredStudentsData);
    
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
    ]

    const columns = useMemo(() => columnData, []);

     // 학생 Filtering
     const [studentFilterText, setStudentFilterText] = useState('');

     useEffect(() => {
         dispatch(searchStudents(studentFilterText));
     }, [studentFilterText]);

    // 이미 등록된 학생은 선택 불가
    const rowDisabledCriteria = (row) => {
        if(lectureData.students!==[]&&lectureData.students!==undefined){
        return lectureData.students.includes(row.id)
    }}

    // 수강 데이터 만들기
    // 수강 정보등록을 위한 데이터
    const [inputFields, setInputFields] = useState([]);
    function makeEnrollData({selectedRows}){
        selectedRows.map((row)=> setInputFields([...inputFields, {lecture: selectedLecture, student: row.id, joined_at: ""}]))
        console.log(inputFields);
    }
    const handleInputFields = (event, index) => {
        let newEnrollData = [...inputFields];
        const time = ""
        if (event.target.name == "joined_at") {
            joinDate = String(event.target.value)
            newEnrollData[index][event.target.name] = joinDate;
            setInputFields(joinDate);
        } else {
            newEnrollData[index][event.target.name] = event.target.value;
            setInputFields(courseTimeData);
        }
    };

    const onCreate = (e) => {
        e.preventDefault();
        console.log(inputFields);
        if (inputFields) {
            const newEnroll = inputFields;
            dispatch(createEnroll(newEnroll))
                .then(router.push("/admin/lectures/enrolls"));
        } else {
            console.log("생성못함");
        }
    };
    

    return (
        <div>
            <ContentTitle title="수강 등록" mainTitle="수강 관리" />
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-xl-9 col-sm-6 mt-3">
                            <div className="mt-2">
                                <h5>강의 선택</h5>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mt-3">
                            <div>
                                <div className="float-end w-100">
                                    <SearchBox onChange={setFilterText} filterText={filterText} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={selectedTeacher!==""?{display:"none"}:{}}>
                        {filteredTeachersList.map((teacher) => {
                            return (
                                <div className="col-xl-2 col-sm-6" key={teacher.id}>
                                    <FileManagerCard icon="faUser"
                                        iconColor="#34c38f"
                                        id={teacher.id}
                                        title={teacher.name}
                                        subtitle={"강의: " + teacher.lectures.length}
                                        caption={teacher.subject}
                                        onClick={setSelectedTeacher} />
                                </div>
                            )
                        })}
                    </div>

                    <div className="row" style={selectedTeacher!==""?{}:{display:"none"}}>
                        <div className="col-xl-3 col-sm-6">
                            <FileManagerCard icon="faBox"
                                iconColor="#f1b44c"
                                title="..."
                                onClick={resetLectureHandler}
                                selected="" />
                        </div>
                        {filteredLecturesList.map((lecture) => {
                            return (
                                <div className="col-xl-3 col-sm-6" key={lecture.id}>
                                    <FileManagerCard icon="faChalkboard"
                                        iconColor="#50a5f1"
                                        id={lecture.id}
                                        title={lecture.name}
                                        subtitle={"수강생: " + lecture.students.length}
                                        caption={lecture.teacher}
                                        onClick={setSelectedLecture}
                                        selected={selectedLecture} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="card" style={selectedLecture!==""?{}:{display:"none"}}>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-xl-9 col-sm-6 mt-3">
                            <div className="mt-2">
                                <h5>학생 선택</h5>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mt-3">
                            <div className="float-end w-100">
                                <SearchBox onChange={setStudentFilterText} filterText={studentFilterText} />
                            </div>
                        </div>
                    <div className="row mt-3">
                        <div>
                            <DataTable
                                columns={columns}
                                data={filteredStudentsList}
                                pagination
                                selectableRows
                                onSelectedRowsChange={makeEnrollData}
                                selectableRowDisabled={rowDisabledCriteria}
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdminEnrollCreatePage.layout = "L1";

export default AdminEnrollCreatePage;
