const CommentCard = (props) => {
    return (<>
        {props.comments.length == 0 ?
            <div className="card border border-secondary">
                <div className="card-body">
                    <h4 className="card-title mb-4">{props.title}</h4>
                    <h5 className="text-secondary">등록된 질문이 없습니다</h5>
                </div>
            </div>
            :
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">{props.title}</h4>

                <div className="d-flex mb-4">
                    <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-12">
                                연준
                            </span>
                        </div>
                    </div>
                    <div className="flex-grow-1 w-50">
                        <h5 className="font-size-13 mb-1">정연준</h5>
                        <p className="text-muted text-omit mb-1">
                            쎈(상) 217쪽 20번 문제 모르겠어요
                        </p>
                    </div>
                    <div className="ms-3">
                        <a className="text-primary no-line-break">답변</a>
                    </div>
                </div>
                <div className="d-flex mb-4">
                    <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-16">
                                S
                            </span>
                        </div>
                    </div>
                    <div className="flex-grow-1 w-50">
                        <h5 className="font-size-13 mb-1">Steve Foster</h5>
                        <p className="text-muted text-omit mb-1">
                            To an English person it will like simplified
                        </p>
                    </div>
                    <div className="ms-3">
                        <a className="text-primary no-line-break">답변</a>
                    </div>
                </div>

                <div className="d-flex mb-4">
                    <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-16">
                                S
                            </span>
                        </div>
                    </div>

                    <div className="flex-grow-1 w-50">
                        <h5 className="font-size-13 mb-1">Steve Foster</h5>
                        <p className="text-muted text-omit mb-1">
                            To an English person it will like simplified
                        </p>
                    </div>
                    <div className="ms-3">
                        <a className="text-primary no-line-break">답변</a>
                    </div>
                </div>

                <div className="text-center mt-4 pt-2">
                    <a className="btn btn-primary btn-sm">View more</a>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default CommentCard