import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateLesson } from '../../store/modules/lessonsSlice';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const ChangeLessonTimeModal = (props) => {
    const dispatch = useDispatch();
    const lessonData = useSelector(state => state.lessons.lessonData);
    const [inputFields, setInputFields] = useState({...lessonData});
    const router = useRouter();

    useEffect(()=>{
        setInputFields({...lessonData})
    },[lessonData])

    const handleFormChange = (e) => {
        if (e.target.name == "start_time" || e.target.name == "end_time") {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value});
        } else {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        }
    };

    const onUpdate = (e) => {
        e.preventDefault();
        if (inputFields) {
            dispatch(updateLesson({ editedLesson: inputFields, lessonId: lessonData.id }))
            .then(router.push(`/admin/lessons/${lessonData.id}`));
        } else {
            console.log("생성못함");
        }
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">수업 시간 변경</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">수업일자<span className='text-danger'>*</span></label>
                            <input type="date" className="form-control" name="date" id="date" value={inputFields.date} onChange={(e)=>handleFormChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">수업 시작시간<span className='text-danger'>*</span></label>
                            <input type="time" className="form-control" name="start_time" id="start_time" value={moment(inputFields.start_time, 'HHmm').format("HH:mm")} onChange={(e)=>handleFormChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">수업 종료시간<span className='text-danger'>*</span></label>
                            <input type="time" className="form-control" name="end_time" id="end_time" value={moment(inputFields.end_time, 'HHmm').format("HH:mm")} onChange={(e)=>handleFormChange(e)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                            className="btn btn-light waves-effect"
                            onClick={() => dispatch(modalClose(props.modalId))}
                        >
                            닫기
                        </button>
                        <button type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={(e) => {
                                onUpdate(e);
                                dispatch(modalClose(props.modalId));
                            }}
                        >제출</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeLessonTimeModal;