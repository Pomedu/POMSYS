import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateLesson } from '../../store/modules/lessonsSlice';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const ChangeLessonStatusModal = (props) => {
    const dispatch = useDispatch();
    const lessonData = useSelector(state => state.lessons.lessonData);
    const router = useRouter();
    const onUpdate = (e) => {
        e.preventDefault();
        dispatch(updateLesson({ editedLesson: { ...lessonData, done: !lessonData.done }, lessonId: lessonData.id }))
            .then(router.push(`/admin/lessons/${lessonData.id}`));
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">수업 상태 변경</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <h5>'{props.Name}'일자 수업의 상태를 변경하시겠습니까?</h5>
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

export default ChangeLessonStatusModal;