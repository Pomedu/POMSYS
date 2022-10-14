import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const DeleteModal = (props) => {
    const dispatch = useDispatch();
    return (
        <div id={props.modalId} className={props.deleteModalOpen?"modal fade show":"modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">삭제</h5>
                        <button type="button" className="btn-close" onClick={()=>dispatch(modalClose(props.modalId))}></button>
                    </div>
                        <div className="modal-body">
                            <h5>'{props.deleteName}'를(을) 삭제 하시겠습니까?</h5>
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
                                    props.onDelete(e,props.deleteId);
                                    dispatch(modalClose(props.modalId));
                                    }}
                                >삭제</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;