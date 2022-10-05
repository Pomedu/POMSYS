import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectBox from "../../../components/Common/SelectBox";

const AdminLectureCreatePage = () => {
    const [inputFields, setInputFields] = useState(
        {
            name: '', teacher: '', status: '', description: '',
            start_date: '', end_date: '', coursetime: [], cost: '', textbook: []
        }
    );

    const handleFormChange = (event) => {
        setInputFields({...inputFields,[event.target.name]:event.target.value});
    };

    function showInput(){
        console.log(inputFields)
    };

    const statusOptions = [
        { value: "P", name: "대기" },
        { value: "O", name: "진행중" },
        { value: "F", name: "종강" },
    ];


    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">강의 생성</h4>
                <div>
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
                            <input
                                name='teacher'
                                placeholder='강사를 입력하세요...'
                                className="form-control"
                                value={inputFields.teacher}
                                onChange={event => handleFormChange(event)}
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

                        <div className="row repeater mb-4">
                            <label className="col-form-label col-lg-2">강의 시간</label>
                            <div data-repeater-list="coursetime">
                                <div data-repeater-item className="mb-3 row">
                                    <div className="col-md-2 col-4" style={{textAlign:"right"}}></div>
                                    <div className="col-md-8 col-6">
                                        <div className="input-group">
                                            
                                            <input data-repeater-delete type="button" className="btn btn-primary" value="삭제" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2 col-4" style={{textAlign:"right"}}></div>
                                <div className="col-md-8 col-6">
                                    <input data-repeater-create type="button" className="btn btn-success" value="시간추가" />
                                </div>
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
                            <SelectBox name="status" options={statusOptions} onChange={handleFormChange}/>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-lg-10">
                                <button type="submit" className="btn btn-primary" onClick={showInput}>강의 생성</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdminLectureCreatePage.layout = "L1";

export default AdminLectureCreatePage;
