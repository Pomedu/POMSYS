import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createAttachment } from '../../store/modules/attachmentsSlice';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const AddFileModal = (props) => {
    const dispatch = useDispatch();
    const lessonData = useSelector(state => state.lessons.lessonData);
    const [inputFields, setInputFields] = useState(
        {
            name: null, lesson: lessonData.id, attachment_file: null, size: null
        }
    );

    const handleFormChange = (e) => {
        if(e.target.name=="attachment_file"){
            setInputFields({ ...inputFields, "attachment_file": e.target.files[0], "size": e.target.files[0].size});
        }
         else {
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        }
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            dispatch(createAttachment(inputFields));
        } else {
            console.log("생성못함");
        }
    };
    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">파일추가</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch(modalClose(props.modalId))}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">파일명<span className='text-danger'>*</span></label>
                            <input type="text" className="form-control" name="name" id="name" onChange={(e)=>handleFormChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">파일가져오기<span className='text-danger'>*</span></label>
                            <input className="form-control" type="file" name="attachment_file" id="attachment_file" onChange={(e)=>handleFormChange(e)}/>
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

export default AddFileModal;