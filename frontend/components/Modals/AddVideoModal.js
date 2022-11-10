import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, setModalId } from '../../store/modules/modalSlice';
import { createVideo } from '../../store/modules/videosSlice';


const AddVideoModal = (props) => {
    const dispatch = useDispatch();
    const lessonData = useSelector(state => state.lessons.lessonData);
    const [inputFields, setInputFields] = useState(
        {
            name: null, lesson: lessonData.id, link: null
        }
    );

    const handleFormChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            dispatch(createVideo(inputFields));
        } else {
            console.log("생성못함");
        }
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">영상추가</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">영상명<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" name="name" id="name" onChange={(e)=>handleFormChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">영상링크<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" name="link" id="link" onChange={(e)=>handleFormChange(e)}/>
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

export default AddVideoModal;