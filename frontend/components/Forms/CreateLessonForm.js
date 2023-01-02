import React, { useEffect, useState } from "react";
import SelectBox from "../Common/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../store/modules/lecturesSlice";
import { createLesson } from "../../store/modules/lessonsSlice";
import router from "next/router";
import { useCookies } from 'react-cookie';

const CreateLessonForm = () => {
    const [cookies, setCookies] = useCookies(['accessToken, refreshToken']);
    const [inputFields, setInputFields] = useState(
        {
           lecture: '', date: '', start_time: '', end_time: '', done: false
        }
    );

    const handleFormChange = (event) => {       
            setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            const newLesson = inputFields;
            console.log(newLesson);
            dispatch(createLesson(newLesson))
                .then(router.push("/admin/lessons"));
        } else {
            console.log("생성못함");
        }
    };

    // 강의 정보 불러오기
    const lectureList = useSelector(state => state.lectures.lecturesData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLectures());
    }, []);
    const lectureOptions = lectureList.map(lecture => ({ "value": lecture.id, "name": lecture.name }));

    return (
        <div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의</label>
                <div className="col-lg-10">
                <SelectBox
                        name='lecture'
                        options={lectureOptions}
                        className="form-control"
                        onChange={event => handleFormChange(event)}
                        value={inputFields.teacher}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의 날짜</label>
                <div className="col-lg-10">
                    <div className="input-daterange input-group" id="project-date-inputgroup" data-provide="datepicker" data-date-format='yyyy-mm-dd' data-date-container='#project-date-inputgroup' data-date-autoclose="true">
                        <input
                            type='date'
                            name='date'
                            className="form-control"
                            value={inputFields.date}
                            onChange={event => handleFormChange(event)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의 시간</label>
                <div className="col-lg-10">
                    <div className="input-daterange input-group" id="project-date-inputgroup" data-provide="datepicker" data-date-format='yyyy-mm-dd' data-date-container='#project-date-inputgroup' data-date-autoclose="true">
                        <input
                            type='time'
                            name='start_time'
                            onChange={event => handleFormChange(event)}
                            className="form-control"
                        />
                        <input
                            type='time'
                            name='end_time'
                            onChange={event => handleFormChange(event)}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-4 align-items-center">
                <label className="col-form-label col-lg-2">진행여부</label>
                <div className="col-lg-10">                    
                    <input type="checkbox" className="form-check-input" defaultChecked={inputFields.done} onChange={event => handleFormChange(event)} />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-2" />
                <div className="col-lg-10">
                    <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onCreate}>수업 생성</button>
                </div>
            </div>
        </div>
    )
}

export default CreateLessonForm