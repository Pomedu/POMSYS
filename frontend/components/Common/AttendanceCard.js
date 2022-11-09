import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { createAttendance, fetchLessonAttendances, updateAttendance } from '../../store/modules/attendancesSlice';

const AttendanceCard = () => {
    const lessonData = useSelector(state => state.lessons.lessonData);
    const enrollsData = useSelector(state => state.enrolls.enrollsData);
    const attendancesData = useSelector(state => state.attendances.attendancesData);
    const attendanceData = useSelector(state => state.attendances.attendanceData);

    var attendList = [];
    var absentList = [];
    if (attendancesData) {
        attendancesData.filter((item) => item.attend == true).map((item)=> attendList.push(item.student));
        attendancesData.filter((item) => item.attend == false).map((item)=> absentList.push(item.student));
    }

    const [newAttend, editNewAttend] = useState({"student": null, "attend": null, "lesson": lessonData.id});
    const [selectedAttendance, setSelectedAttendance] = useState();

    const dropdownClickHandler=(studentId)=>{
        if(newAttend.student==studentId){
            editNewAttend({student : null, attend : null, lesson : lessonData.id});
            setSelectedAttendance();
        } else {
            editNewAttend({student: studentId, attend: null, lesson: lessonData.id});
            try{
                setSelectedAttendance(attendancesData.find((item) => item.student == studentId).id);
            } catch(e) {
                setSelectedAttendance();
            }
        }
    }

    const attendChangeHandler= (e) => {
        if(e.target.value == 'true'){
            editNewAttend({...newAttend, attend: true});
        } else {
            editNewAttend({...newAttend, attend: false});
        }
    };

    const dispatch = useDispatch();
    const attendCreateHandler =(e)=> {
        e.preventDefault();
        if (newAttend.attend!==null) {
            if(attendList.includes(newAttend.student)||absentList.includes(newAttend.student)){
                dispatch(updateAttendance({ editedAttendance: newAttend, attendanceId: selectedAttendance }));
            } else {
                dispatch(createAttendance(newAttend));
            }
        } else {
            console.log("생성못함");
        }
        editNewAttend({student : null, attend : null, lesson : lessonData.id});
    }

    useEffect(()=>{
        dispatch(fetchLessonAttendances(lessonData.id));
    },[attendanceData]);

    const newAttendData = {}

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-3 text-center">
                        <div className="text-success font-size-14 mb-2 no-line-break">출석</div>
                        <h3 className="text-success">{attendList.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="text-danger font-size-14 mb-2 no-line-break">결석</div>
                        <h3 className="text-danger">{absentList.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="font-size-14 mb-2 no-line-break">총원</div>
                        <h3>{enrollsData.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="text-warning font-size-14 mb-2 no-line-break">미기입</div>
                        <h3 className="text-warning">{enrollsData.length - attendList.length - absentList.length}</h3>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-nowrap align-middle table-hover mb-0 mt-2 text-center">
                        <tbody>
                            {enrollsData.map((enroll) =>
                                <tr key={enroll.student.id}>
                                    <td>
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-12">
                                                {enroll.student.name.slice(-2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td><h5 className="font-size-14 m-0"><span className="text-dark">{enroll.student.name}</span></h5></td>
                                    <td>
                                        <h5 className="font-size-14 m-0">
                                            {attendList.includes(enroll.student.id) ? <span className="text-success">출석</span> :
                                                (absentList.includes(enroll.student.id) ? <span className="text-danger">결석</span> :
                                                    <span className="text-warning ">미기입</span>)}
                                        </h5>
                                    </td>
                                    <td>
                                        <div className='dropdown-toggle dropstart'>
                                            <a className='badge badge-soft-success me-1 font-size-12' onClick={() => { dropdownClickHandler(enroll.student.id) }} >
                                                <BiEdit />
                                            </a>
                                            <div className={enroll.student.id == newAttend.student ? "dropdown-menu show" : "dropdown-menu"}>
                                                <div className='dropdown-item'>
                                                    <div className="form-radio-success text-success mb-2" >출석
                                                        <input className="form-check-input float-end" type="radio" name="attend" value="true"
                                                        onChange={(e)=>attendChangeHandler(e)}/>
                                                    </div>
                                                    <div className="form-radio-danger text-danger" >결석
                                                        <input className="form-check-input float-end" type="radio" name="attend" value="false"
                                                        onChange={(e)=>attendChangeHandler(e)}/>
                                                    </div>
                                                </div>
                                                <div className='dropdown-item'>
                                                    <button className='btn btn-sm btn-primary mt-2 float-end' onClick={attendCreateHandler}>변경</button>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCard