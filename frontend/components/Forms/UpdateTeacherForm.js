import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { updateTeacher } from "../../store/modules/teachersSlice";
import SelectBox from "../Common/SelectBox";


const UpdateTeacherForm = () => {
    const teacherData = useSelector(state => state.teachers.teacherData);
    const [inputFields, setInputFields] = useState();

    useEffect(() => {
        const deepcopy = JSON.parse(JSON.stringify(teacherData));
        setInputFields(deepcopy);
    }, [teacherData])

    const handleFormChange = (event) => {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const dispatch = useDispatch();
    const onUpdate = (e) => {
        e.preventDefault();
        if (inputFields) {
            const id = inputFields.id;
            dispatch(updateTeacher({ editedTeacher: inputFields, teacherId: id }))
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

    if (inputFields) {
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
                            placeholder='전화번호를 입력하세요...'
                            className="form-control"
                            value={inputFields.phone_number}
                            onChange={event => handleFormChange(event)}
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <label className="col-form-label col-lg-2">담당 과목</label>
                    <div className="col-lg-10">
                        <SelectBox name="subject" options={subjectOptions} onChange={handleFormChange} value={inputFields.subject} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2" />
                    <div className="col-lg-10">
                        <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onUpdate}>정보 수정</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateTeacherForm