import moment from 'moment';
import "moment/locale/ko"
import React from 'react'
import { BiEdit, BiTrashAlt, BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose, modalOpen, } from '../../store/modules/modalSlice';

const CalendarEventDetailModal = (props) => {
    const dispatch = useDispatch();
    const teachersData = useSelector(state => state.teachers.teachersData);

    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
            <div className="modal-content" style={{borderColor:props.event?props.colors[props.event.calendarId-1]:"#ffffff"}}>
                    <div className="modal-header">
                        <h5 className="modal-title">수업 상세정보</h5>
                        <button type="button" className="btn-close"
                            onClick={() => {
                                dispatch(modalClose(props.modalId));
                            }}></button>
                    </div>
                    <div className="modal-body">
                        <h5>{props.event?props.event.title : ""}</h5>
                        <div>{props.event?moment(new Date(props.event.start)).format("YYYY-MM-DD")+" "+
                        moment(new Date(props.event.start)).format("A hh:mm")+" ~ "+
                        moment(new Date(props.event.end)).format("A hh:mm") : ""}</div>
                        {props.event?<div className='font-size-12 mt-1' style={{color:props.colors[props.event.calendarId-1]}}><BiUser/>{teachersData[props.event.calendarId-1].name}</div>:""}
                    </div>
                    <div className="modal-footer float-clear">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={()=>{
                                dispatch(modalClose(props.modalId));
                                dispatch(modalOpen("calendarEventUpdateModal"));}}
                                >
                                <BiEdit/>
                                <span className='ms-1'>시간 변경</span>
                            </button>
                            <button type="button" className="btn btn-danger ms-1" onClick={()=>{
                                props.onDelete(props.event);
                                dispatch(modalClose(props.modalId));}}>
                                <BiTrashAlt />
                                <span className='ms-1'>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarEventDetailModal;