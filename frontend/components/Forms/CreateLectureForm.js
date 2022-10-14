import React, { useEffect, useState } from "react";
import SelectBox from "../Common/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../store/modules/teachersSlice";
import { createLecture } from "../../store/modules/lecturesSlice";
import router from "next/router";

const CreateLectureForm = () => {
    const [inputFields, setInputFields] = useState(
        {
            name: '', teacher: '', status: '', description: '',
            start_date: '', end_date: '', cost: 0, coursetime: [], textbook: []
        }
    );
    const [inputCourseTimeFields, setInputCourseTimeFields] = useState([{
        day: '', start_time: '', end_time: ''
    },])

    const handleFormChange = (event) => {
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const handleCourseTimeFormChange = (event, index) => {
        let courseTimeData = [...inputCourseTimeFields];
        const time = ""
        if (event.target.name == "start_time" || event.target.name == "end_time") {
            time = String(event.target.value).replace(":", "")
            courseTimeData[index][event.target.name] = time;
            setInputCourseTimeFields(courseTimeData);
            setInputFields({ ...inputFields, ['coursetime']: inputCourseTimeFields });
        } else {
            courseTimeData[index][event.target.name] = event.target.value;
            setInputCourseTimeFields(courseTimeData);
            setInputFields({ ...inputFields, ['coursetime']: inputCourseTimeFields });
        }
    };
    // 선생님 정보 불러오기
    const teacherList = useSelector(state => state.teachers.teachersData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeachers())
            .unwrap()
            .catch(error => {
                console.log("### error: ", error);
            });

    }, []);

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            const newLecture = inputFields;
            dispatch(createLecture(newLecture))
                .then(router.push("/admin/lectures"));
        } else {
            console.log("생성못함");
        }
    };


    const addCourseTimeFields = () => {
        let object = {
            day: '', start_time: '', end_time: ''
        }
        setInputCourseTimeFields([...inputCourseTimeFields, object])
    }

    const removeFields = (index) => {
        let data = [...inputCourseTimeFields];
        data.splice(index, 1)
        setInputCourseTimeFields(data)
    }


    const statusOptions = [
        { value: "P", name: "대기" },
        { value: "O", name: "진행중" },
        { value: "F", name: "종강" },
    ];

    const dayOptions = [
        { value: "0", name: "월요일" },
        { value: "1", name: "화요일" },
        { value: "2", name: "수요일" },
        { value: "3", name: "목요일" },
        { value: "4", name: "금요일" },
        { value: "5", name: "토요일" },
        { value: "6", name: "일요일" },
    ];

    const teacherOptions = teacherList.map(teacher => ({ "value": teacher.id, "name": teacher.name }));

    return (
        <div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의명</label>
                <div className="col-lg-10">
                    <input
                        name='name'
                        placeholder='강의명을 입력하세요...'
                        className="form-control"
                        value={inputFields.name}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강사</label>
                <div className="col-lg-10">
                    <SelectBox
                        name='teacher'
                        options={teacherOptions}
                        className="form-control"
                        onChange={event => handleFormChange(event)}
                        value={inputFields.teacher}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의 기간</label>
                <div className="col-lg-10">
                    <div className="input-daterange input-group" id="project-date-inputgroup" data-provide="datepicker" data-date-format='yyyy-mm-dd' data-date-container='#project-date-inputgroup' data-date-autoclose="true">
                        <input
                            type='date'
                            name='start_date'
                            className="form-control"
                            value={inputFields.start_date}
                            onChange={event => handleFormChange(event)}
                        />
                        <input
                            type='date'
                            name='end_date'
                            className="form-control"
                            value={inputFields.end_date}
                            onChange={event => handleFormChange(event)}
                        />
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의 시간</label>
                <div className="col-lg-10">
                    <div className="mb-3 row">
                        <div>
                            {inputCourseTimeFields.map((form, index) => {
                                return (
                                    <div className="input-group mb-2" key={index}>
                                        <select className="form-control" name="day" onChange={event => handleCourseTimeFormChange(event, index)}>
                                            <option>요일을 선택하세요</option>
                                            {dayOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type='time'
                                            name='start_time'
                                            onChange={event => handleCourseTimeFormChange(event, index)}
                                            className="form-control"
                                        />
                                        <input
                                            type='time'
                                            name='end_time'
                                            onChange={event => handleCourseTimeFormChange(event, index)}
                                            className="form-control"
                                        />
                                        <button className="btn btn-primary waves-effect" onClick={() => removeFields(index)}>삭제</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2" />
                <div className="col-lg-10">
                    <button className="btn btn-success float-end waves-effect" onClick={addCourseTimeFields}>시간추가</button>
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">강의 설명</label>
                <div className="col-lg-10">
                    <textarea
                        name='description'
                        placeholder='강의에 대한 설명을 입력하세요...'
                        className="form-control"
                        value={inputFields.description}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">수강료</label>
                <div className="col-lg-10">
                    <input
                        name='cost'
                        placeholder='수강료를 입력하세요..(예시:300000)'
                        className="form-control"
                        value={inputFields.cost}
                        onChange={event => handleFormChange(event)}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <label className="col-form-label col-lg-2">상태</label>
                <div className="col-lg-10">
                    <SelectBox name="status" options={statusOptions} onChange={handleFormChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2" />
                <div className="col-lg-10">
                    <button type="submit" className="btn btn-primary float-end waves-effect" onClick={onCreate}>강의 생성</button>
                </div>
            </div>
        </div>
    )
}

export default CreateLectureForm