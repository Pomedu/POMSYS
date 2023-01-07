import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";

const CommentCard = (props) => {
    const userData = useSelector(state => state.accounts.userData);
    const questionsData = useSelector(state => state.questions.questionsData);
    return (<>
        {questionsData.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}
                        {userData.role == 'S' ? <button className="btn btn-sm btn-primary float-end" ><BiPlus /> 질문하기</button>
                            : <></>}</h4>
                    <h5 className="text-secondary">등록된 질문이 없습니다</h5>
                </div>
            </div>
            :
            <div className="card wrap-vertical">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}
                        {userData.role == 'S' ? <button className="btn btn-sm btn-primary float-end" ><BiPlus /> 질문하기</button>
                            : <></>}
                    </h4>
                    {questionsData.map(question => {
                        return (
                            <div>
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
                                        <p className="text-muted text-omit mb-1">
                                            {question.question}
                                        </p>
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
                                                <p className="text-muted text-omit mb-1">
                                                    {question.answer}
                                                </p>
                                            </div>
                                        </div>
                                        : <div className="ms-3">
                                            <a className="text-primary no-line-break">답변</a>
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
    </>
    );
};

export default CommentCard