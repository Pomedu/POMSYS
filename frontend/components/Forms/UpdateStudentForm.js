import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { updateStudent } from "../../store/modules/studentsSlice";


const UpdateStudentForm = () => {
    const studentData = useSelector(state => state.students.studentData);
    const [inputFields, setInputFields] = useState();

    useEffect(() => {
        const deepcopy = JSON.parse(JSON.stringify(studentData));
        setInputFields(deepcopy);
    }, [studentData])

    const handleFormChange = (event) => {
        if(event.target.name=="phone_number"||event.target.name=="phone_number_P"){
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const dispatch = useDispatch();
    const onUpdate = (e) => {
        e.preventDefault();
        if (inputFields) {
            console.log(inputFields);
            const id = inputFields.id;
            dispatch(updateStudent({ editedStudent: inputFields, studentId: id }))
                .then(router.push("/admin/students"));
        } else {
            console.log("생성못함");
        }
    };

    if (inputFields) {
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
                        <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onUpdate}>정보 수정</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateStudentForm