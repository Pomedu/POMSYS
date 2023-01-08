import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, setModalId } from '../../store/modules/modalSlice';
import { createQuestion } from '../../store/modules/questionsSlice';


const AddQuestionModal = (props) => {
    const dispatch = useDispatch();
    const lessonData = useSelector(state => state.lessons.lessonData);
    const studentData = useSelector(state => state.students.studentData);
    const [inputFields, setInputFields] = useState(
        {
            question: null, lesson: lessonData.id, student: studentData.id
        }
    );
    
    useEffect(()=>{
        setInputFields({...inputFields, lesson:lessonData.id});
    },[lessonData])

    useEffect(()=>{
        setInputFields({...inputFields, student:studentData.id});
    },[studentData])
    
    const handleFormChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            dispatch(createQuestion(inputFields));
        } else {
            console.log("생성못함");
        }
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">질문하기</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">질문내용<span className='text-danger'>*</span></label>
                            <textarea className="form-control" name="question" id="question" onChange={(e)=>handleFormChange(e)}/>
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
                                onCreate(e);
                                dispatch(modalClose(props.modalId));
                            }}
                        >제출</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuestionModal;