import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, setModalId } from '../../store/modules/modalSlice';
import { updateQuestion } from '../../store/modules/questionsSlice';


const AnswerQuestionModal = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.accounts.userData);
    const questionData = useSelector(state=> state.questions.questionData);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [inputFields, setInputFields] = useState(
        {
            answer: null, answerer: userData.pk
        }
    );

    useEffect(()=>{
        setInputFields({...inputFields, answerer: userData.pk});
    },[userData])

    useEffect(()=>{
        setSelectedQuestion(questionData.id);
    },[questionData])
    
    const handleFormChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const onUpdate = (e) => {
        e.preventDefault();
        if (inputFields) {
            console.log(inputFields);
            dispatch(updateQuestion({ answer:inputFields, questionId:selectedQuestion }));
        } else {
            console.log("생성못함");
        }
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">답변하기</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <div className="font-size-15 fw-semibold mb-2">질문내용</div>
                            <div className='font-size-14'>{questionData.question}</div>
                        </div>  
                        <div className="mb-3">
                            <label className="col-form-label">답변내용<span className='text-danger'>*</span></label>
                            <textarea className="form-control" name="answer" id="answer" onChange={(e)=>handleFormChange(e)}/>
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

export default AnswerQuestionModal;