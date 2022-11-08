import React, { useEffect, useState } from "react";
import SelectBox from "../Common/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { createTeacher } from "../../store/modules/teachersSlice";
import router from "next/router";

const CreateTeacherForm = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(
        {
            name: '', phone_number: '', subject: '',
        }
    );

    const handleFormChange = (event) => {
        if(event.target.name=="phone_number"){
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            const newTeacher = inputFields;
            dispatch(createTeacher(newTeacher))
                .then(router.push("/admin/teachers"));
        } else {
            console.log("생성못함");
        }
    };

    const subjectOptions = [
        { value: "kor", name: "국어" },
        { value: "math", name: "수학" },
        { value: "eng", name: "영어" },
        { value: "sci", name: "과학" },
        { value: "soc", name: "사회" },
        { value: "ess", name: "논술" },
    ];



    return (
        <div>
             <div className="row mb-4">
                <label className="col-form-label col-lg-2">강사명</label>
                <div className="col-lg-10">
                    <input
                        name='name'
                        placeholder='강사명을 입력하세요...'
                        className="form-control"
                        value={inputFields.name}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">전화번호</label>
                <div className="col-lg-10">
                    <input
                        name='phone_number'
                        placeholder='전화번호를 입력하세요(숫자만)'
                        className="form-control"
                        value={inputFields.phone_number}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">담당 과목</label>
                <div className="col-lg-10">
                    <SelectBox name="subject" options={subjectOptions} onChange={handleFormChange} />
                </div>
            </div>
            <div className="row">
            <div className="col-lg-2" />
                <div className="col-lg-10">
                    <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onCreate}>강사 생성</button>
                </div>
            </div>
        </div>
    )
}

export default CreateTeacherForm