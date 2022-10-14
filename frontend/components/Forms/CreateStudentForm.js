import React, { useEffect, useState } from "react";
import SelectBox from "../Common/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { createStudent } from "../../store/modules/studentsSlice";


const CreateStudentForm = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(
        {
            name: '', phone_number: '', school: '', phone_number_P: '',
        }
    );

    const handleFormChange = (event) => {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            const newStudent = inputFields;
            dispatch(createStudent(newStudent))
                .then(router.push("/admin/students"));
        } else {
            console.log("생성못함");
        }
    };


    return (
        <div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">학생명</label>
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
                    <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onCreate}>학생 생성</button>
                </div>
            </div>
        </div>
    )
}

export default CreateStudentForm