import { useEffect, useState } from "react";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../store/modules/modalSlice";
import { deleteQuestion, fetchLessonQuestions, fetchQuestion } from "../../store/modules/questionsSlice";
import AddQuestionModal from "../Modals/AddQuestionModal";
import AnswerQuestionModal from "../Modals/AnswerQuestionModal";

const CommentCard = (props) => {
    const userData = useSelector(state => state.accounts.userData);
    const questionsData = useSelector(state => state.questions.questionsData);
    const questionData = useSelector(state => state.questions.questionData);
    const studentData = useSelector(state => state.students.studentData);
    const ModalOpen = useSelector((state) => state.modal.show);
    const dispatch = useDispatch(); 

    useEffect(()=>{
        dispatch(fetchLessonQuestions(props.lessonData.id))
    },[questionData])

    const questionCreateHandler = () => {
        dispatch(modalOpen('questionCreateModal'));
    }
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const selectQuestionHandler = (question_id) =>{
        if(selectedQuestion==question_id){
            setSelectedQuestion(null);
        } else {
            setSelectedQuestion(question_id);
        }
    }
    const selectAnswerHandler = (question_id) =>{
        if(selectedAnswer==question_id){
            setSelectedAnswer(null);
        } else {
            setSelectedAnswer(question_id);
        }
    }
    const questionUpdateHandler = (question_id) => {
        dispatch(fetchQuestion(question_id));
        dispatch(modalOpen('questionUpdateModal'));
    }
    const questionDeleteHandler = (question_id) => {
        dispatch(deleteQuestion(question_id));
    }

    return (<>
        {questionsData.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}
                        {userData.role == 'S' ? <button className="btn btn-sm btn-primary float-end" onClick={questionCreateHandler}>
                            <BiPlus /> 질문하기</button>
                            : <></>}</h4>
                    <h5 className="text-secondary">등록된 질문이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}
                        {userData.role == 'S' ? <button className="btn btn-sm btn-primary float-end" onClick={questionCreateHandler}>
                            <BiPlus /> 질문하기</button>
                            : <></>}
                    </h4>
                    {questionsData.map(question => {
                        return (
                            <div key={question.id}>
                                <div className="d-flex mb-2">
                                    <div className="flex-shrink-0 me-3">
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-12">
                                                {question.student.name.slice(-2)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 w-50">
                                        <h5 className="font-size-13 mb-1">{question.student.name}</h5>
                                        <div className="dropstart clickable">
                                            <div className="text-muted text-omit mb-1" onClick={e=>selectQuestionHandler(question.id)}>
                                            {question.question}
                                            </div>
                                            <div className={question.id == selectedQuestion ? "dropdown-menu show" : "dropdown-menu"} 
                                            style={{width:'300px'}}>
                                                <div className='dropdown-item' style={{whiteSpace:'normal'}}>
                                                    {question.question}
                                                </div>  
                                                {question.student.id==studentData.id?
                                                        <div className='dropdown-item' style={{whiteSpace:'normal'}}>
                                                            <a className="text-danger clickable float-end" onClick={(e) => questionDeleteHandler(question.id)}>
                                                            <i className="h5 m-0 text-danger"><BiTrash/></i>삭제</a>
                                                        </div>:<></>
                                                        }                                
                                            </div>
                                        </div>
                                        {question.answer ?
                                        <div className="d-flex mb-4 pt-3">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-12">
                                                        {question.answerer.name.slice(-2)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 w-50">
                                                <h5 className="font-size-13 mb-1">{question.answerer.name}</h5>
                                                <div className="dropstart clickable">
                                                    <div className="text-muted text-omit mb-1" onClick={e=>selectAnswerHandler(question.id)}>
                                                    {question.answer}
                                                    </div>
                                                    <div className={question.id == selectedAnswer ? "dropdown-menu show" : "dropdown-menu"} 
                                                    style={{width:'300px'}}>
                                                        <div className='dropdown-item' style={{whiteSpace:'normal'}}>
                                                            {question.answer}
                                                        </div> 
                                                        {question.answerer.pk==userData.pk?
                                                        <div className='dropdown-item' style={{whiteSpace:'normal'}}>
                                                            <a className="text-success clickable float-end" onClick={(e) => questionUpdateHandler(question.id)}>
                                                            <i className="h5 m-0 text-success"><BiEdit/></i>수정</a>
                                                        </div>:<></>
                                                        }                             
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : 
                                        <div className="ms-3">
                                        {userData.role =='S'?
                                        <></>:
                                            <a className="text-primary no-line-break clickable" onClick={e=>questionUpdateHandler(question.id)}><FaReply/> 답변</a>
                                        }
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        <AddQuestionModal
            ModalOpen={ModalOpen}
            modalId={'questionCreateModal'}/>
        <AnswerQuestionModal
            ModalOpen={ModalOpen}
            modalId={'questionUpdateModal'}/>
    </>
    );
};

export default CommentCard