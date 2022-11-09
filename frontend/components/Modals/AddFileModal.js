import Script from 'next/script';
import React from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const AddFileModal = (props) => {
    const dispatch = useDispatch();
    return (
        <div id={props.modalId} className={props.ModalOpen?"modal fade show":"modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">파일추가</h5>
                        <button type="button" className="btn-close" onClick={()=>dispatch(modalClose(props.modalId))}></button>
                    </div>
                        <div className="modal-body">
                            <div>
                                <form action="#" className="dropzone">
                                    <div className="fallback">
                                        <input name="file" type="file" multiple="multiple"/>
                                    </div>
                                    <div className="dz-message needsclick">
                                        <div className="mb-3">
                                            <BiCloudUpload className="display-4 text-muted"/>
                                        </div>
                                        <h4>Drop files here or click to upload.</h4>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                className="btn btn-secondary waves-effect" 
                                onClick={()=>dispatch(modalClose(props.modalId))}
                                >
                                    닫기
                            </button>
                            <button type="button" 
                                className="btn btn-danger waves-effect waves-light"
                                onClick={(e)=>{
                                    props.onChange(e,props.Id);
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