import React, { useEffect, useState } from "react";
import SelectBox from "../Common/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import { createEnroll } from "../../store/modules/enrollsSlice";


const CreateEnrollForm = (props) => {
    const studentsList = useSelector(state => state.students.studentsData);
    const filteredStudentsList = useSelector(state => state.students.filteredStudentsData);
    const router = useRouter()
    const dispatch = useDispatch();
    
    // Data Fetch (Students) => 학생 선택용
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
                <a className="badge badge-soft-primary" onClick={(e) => onDelete(e, row.id)}>선택</a>
            </span>)
        },
    ]

    const columns = useMemo(() => columnData, []);

     // 학생 Filtering
     const [filterText, setFilterText] = useState('');

     useEffect(() => {
         dispatch(searchStudents(filterText));
     }, [filterText]);

    // 수강 정보등록을 위한 데이터
    const [inputFields, setInputFields] = useState([{lecture: props.lectureId, student: "", joined_at: ""},]);

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
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">명</label>
                <div className="col-lg-10">
                    <input
                        name='name'
                        placeholder='학생명을 입력하세요...'
                        className="form-control"
                        value={inputFields.name}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">학생 전화번호</label>
                <div className="col-lg-4">
                    <input
                        name='phone_number'
                        placeholder='학생 전화번호를 입력하세요...'
                        className="form-control"
                        value={inputFields.phone_number}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
                <label className="col-form-label col-lg-2">학부모 전화번호</label>
                <div className="col-lg-4">
                    <input
                        name='phone_number_P'
                        placeholder='학부모 전화번호를 입력하세요...'
                        className="form-control"
                        value={inputFields.phone_number_P}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">학교</label>
                <div className="col-lg-10">
                    <input
                        name='school'
                        placeholder='학교를 입력하세요(축약 금지).'
                        className="form-control"
                        value={inputFields.school}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2" />
                <div className="col-lg-10">
                    <button type="submit" className="btn btn-primary float-end" onClick={onCreate}>학생 생성</button>
                </div>
            </div>
        </div>
    )
}

export default CreateEnrollForm