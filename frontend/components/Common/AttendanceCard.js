import { useState } from 'react';
import { BiEdit } from 'react-icons/bi'

const AttendanceCard = (props) => {

    var attendList = [];
    var absentList = [];
    if (props.attendancesData) {
        props.attendancesData.filter((item) => item.attend == true).map((item)=> attendList.push(item.id));
        props.attendancesData.filter((item) => item.attend == false).map((item)=> absentList.push(item.id));
    }

    const [attend, editAttend] = useState({"student": null, "attend": null, "lesson": props.lessonData.id});

    const dropdownClickHandler=(studentId)=>{
        if(attend.student==studentId){
            editAttend({"student": null, "attend": null, "lesson": props.lessonData.id});
        } else {
            editAttend({"student": studentId, "attend": true, "lesson": props.lessonData.id});
        }
    }

    const attendChangeHandler= (e) => {
        if(e.target.value=='true'){
            editAttend({...attend, "attend": true});
            console.log(attend);
        } else {
            editAttend({...attend, "attend": false});
            console.log(attend);
        }
    };

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
                        <h3 className="text-success">{props.enrollsData.length}</h3>
                    </div>
                    <div className="col-3 text-center">
                        <div className="text-warning font-size-14 mb-2 no-line-break">미기입</div>
                        <h3 className="text-warning">{props.enrollsData.length - attendList.length - absentList.length}</h3>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-nowrap align-middle table-hover mb-0 mt-2 text-center">
                        <tbody>
                            {props.enrollsData.map((enroll) =>
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
                                            <div className={enroll.student.id == attend.student ? "dropdown-menu show" : "dropdown-menu"}>
                                                <div className='dropdown-item'>
                                                    <div className="form-radio-success text-success mb-2" >출석
                                                        <input className="form-check-input float-end" type="radio" name="attend" value="true"
                                                        checked onChange={(e)=>attendChangeHandler(e)}/>
                                                    </div>
                                                    <div className="form-radio-danger text-danger" >결석
                                                        <input className="form-check-input float-end" type="radio" name="attend" value="false"
                                                        onChange={(e)=>attendChangeHandler(e)}/>
                                                    </div>
                                                </div>
                                                <div className='dropdown-item'>
                                                    <button className='btn btn-sm btn-primary mt-2 float-end'>변경</button>
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