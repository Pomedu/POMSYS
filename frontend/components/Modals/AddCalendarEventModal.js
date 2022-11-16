import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createLesson } from '../../store/modules/lessonsSlice';
import { modalClose, setModalId } from '../../store/modules/modalSlice';


const AddCalendarEventModal = (props) => {
    const dispatch = useDispatch();
    const teachersData = useSelector(state => state.teachers.teachersData);    
    const lecturesData = useSelector(state => state.lectures.lecturesData);
    const [selectedTeacher,setSelectedTeacher] = useState(null);
    const [selecteLecture,setSelectedLecture] = useState(null);
    const [filteredLecturesData,setFilteredLecturesData] = useState([]);
    const [inputFields, setInputFields] = useState({lecture: null, date: null, start_time: null, end_time:null});
    const [newEvent, setNewEvent] = useState(null);
    const handleFormChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const onCreate = (e) => {
        e.preventDefault();
        if (inputFields) {
            setInputFields({ ...inputFields, ["date"]: props.date });
            dispatch(createLesson(inputFields))
            .then(res=>{
                setNewEvent({
                    id: res.payload.id,
                    calendarId: null,
                    title: null,
                    start: res.payload.date+"T"+res.payload.start_time,
                    end: res.payload.date+"T"+res.payload.end_time,
                    state: null,
                    attendees: null,
                })
            });      
            const calendarInst = props.cal.current.getInstance();
            calendarInst.createEvent([newEvent]);  
        } else {
            console.log("생성못함");
        }
    };

    const setTeacherHandler=(e)=>{
        console.log(e.target.value);
        setSelectedTeacher(e.target.value)
    }

    const setLectureHandler=(e)=>{
        console.log(e.target.value);
        setSelectedLecture(e.target.value)
    }

    useEffect(()=>{
        setFilteredLecturesData(lecturesData.filter(lecture=>lecture.teacher==selectedTeacher));
    },[selectedTeacher])

    return (
        <div id={props.modalId} className={props.ModalOpen ? "modal fade show" : "modal fade"}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">수업 생성하기</h5>
                        <button type="button" className="btn-close"  
                                onClick={() => {dispatch(modalClose(props.modalId));}}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">강사<span className='text-danger'>*</span></label>
                            <select className="form-control form-select" name="teacher" onChange={setTeacherHandler}>
                                <option defaultValue={true}>======select======</option>
                                {teachersData.map(teacher=><option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">강의<span className='text-danger'>*</span></label>
                            <select className="form-control form-select" name="lecture" 
                            onChange={(e)=>{handleFormChange(e);setLectureHandler(e);}}>                          
                                <option defaultValue={true}>======select======</option>
                                {filteredLecturesData.map(lecture=><option key={lecture.id} value={lecture.id}>{lecture.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">수업 날짜<span className='text-danger'>*</span></label>
                            <input disabled type="date" className="form-control" name="date" id="date" value={props.date||''}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">수업 시작시간<span className='text-danger'>*</span></label>
                            <input type="time" className="form-control" name="start_time" id="start_time" value={moment(inputFields.start_time, 'HHmm').format("HH:mm")||''} onChange={(e)=>handleFormChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">수업 종료시간<span className='text-danger'>*</span></label>
                            <input type="time" className="form-control" name="end_time" id="end_time" value={moment(inputFields.end_time, 'HHmm').format("HH:mm")||''} onChange={(e)=>handleFormChange(e)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                            className="btn btn-light waves-effect"
                            onClick={() => {dispatch(modalClose(props.modalId));props.refresh();}}
                        >
                            닫기
                        </button>
                        <button type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={(e) => {
                                onCreate(e);
                                dispatch(modalClose(props.modalId));
                                props.refresh();}}
                        >제출</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCalendarEventModal;