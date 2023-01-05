import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchTeacher, fetchTeachers } from "../../../store/modules/teachersSlice";
import "moment/locale/ko"
import ContentTitle from "../../../components/Common/ContentTitle";
import { deleteLesson, fetchLesson, fetchLessons, fetchTeacherLessons, updateLesson,} from "../../../store/modules/lessonsSlice";
import { BiUser, BiChevronDown,BiChevronLeft, BiChevronRight, BiCalendar } from 'react-icons/bi'
import dynamic from 'next/dynamic'
import moment from "moment";
import wrapper from "../../../store/configureStore";
import TimeTable from "../../../components/Common/TimeTable";
import { useDispatch, useSelector } from "react-redux";
import AddCalendarEventModal from "../../../components/Modals/AddCalendarEventModal";
import { modalClose, modalOpen } from "../../../store/modules/modalSlice";
import { fetchLectures } from "../../../store/modules/lecturesSlice";
import CalendarEventDetailModal from "../../../components/Modals/CalendarEventDetailModal";
import {randomColor} from "randomcolor"
import CalendarEventUpdateModal from "../../../components/Modals/CalendarEventUpdateModal";

const TeacherLectureTimeTablePage = ({ teachersData, colors }) => {
    const dispatch = useDispatch();    
    const modalOpenState = useSelector((state)=>state.modal.show);
    const lessonsData = useSelector((state)=>state.lessons.lessonsData);
    const lessonData = useSelector((state)=>state.lessons.lessonData);
    const userData = useSelector(state=>state.accounts.userData);
    const teacherData = useSelector(state => state.teachers.teacherData); // 강사계정용 구분을 위한 데이터
    const teacher_pk = 0;
    // Data Fetch (Lessons)
    useEffect(() => {
        if(userData.role){
            if(userData.role=='T'){
                teacher_pk = teachersData.find(teacher=>teacher.name==userData.name&&teacher.phone_number==userData.phone_number).id;
                dispatch(fetchTeacher(teacher_pk));
                dispatch(fetchTeacherLessons(teacher_pk));
                console.log(lessonsData)
            } 
        } 
    }, []);
    // 시간표
    const cal = useRef(null);
    const calendarInst = null;
    const [dateRangeText, setDateRangeText] = useState(moment().format("yyyy-MM"));
    function setRenderRangeText() {
        const view = calendarInst.getViewName();
        const calDate = calendarInst.getDate();
        const rangeStart = calendarInst.getDateRangeStart();
        const rangeEnd = calendarInst.getDateRangeEnd();
        let year = calDate.getFullYear();
        let month = calDate.getMonth() + 1;
        let date = calDate.getDate();
        let endMonth, endDate, start, end;

        switch (view) {
            case "month":
                setDateRangeText(`${year}-${month}`);
                break;
            case "week":
                year = rangeStart.getFullYear();
                month = rangeStart.getMonth() + 1;
                date = rangeStart.getDate();
                endMonth = rangeEnd.getMonth() + 1;
                endDate = rangeEnd.getDate();

                start = `${year}-${month < 10 ? "0" : ""}${month}-${date < 10 ? "0" : ""
                    }${date}`;
                end = `${year}-${endMonth < 10 ? "0" : ""}${endMonth}-${endDate < 10 ? "0" : ""
                    }${endDate}`;
                setDateRangeText(`${start} ~ ${end}`);
                break;
            default:
                setDateRangeText(`${year}-${month}-${date}`);
        }
    }

    // 수업 진행완료-미진행 표시
    function setTemplate(){
        calendarInst = cal.current.getInstance();
        calendarInst.setOptions({
            template: {
                time(event){
                    return `<span style="color: black;">${event.title}</span>`;
                }
            }
        })
    }
    const onAfterRenderEvent = (event) => {
        calendarInst = cal.current.getInstance();
        setRenderRangeText();
        setTemplate();
    };

    // 달력 보기 방식 변경
    const [view, setView] = useState('month');
    const [viewDropdown, setViewDropdown] = useState(false);

    const viewDropdownHandler = (e) => {
        e.preventDefault();
        setViewDropdown(!viewDropdown);
    };
    const dailyViewHandler = () => {
        setView('day');
        setViewDropdown(false);
    };
    const weeklyViewHandler = () => {
        setView('week');
        setViewDropdown(false);
    };
    const monthlyViewHandler = () => {
        setView('month');
        setViewDropdown(false);
    };

    // 달력 이동
    const handleClickPrev = () => {
        calendarInst = cal.current.getInstance();
        calendarInst["prev"]();
        setRenderRangeText();
    }
    const handleClickNext = () => {
        calendarInst = cal.current.getInstance();
        calendarInst["next"]();
        setRenderRangeText();
    }
    const handleClickToday = () => {
        calendarInst = cal.current.getInstance();
        calendarInst["today"]();
        setRenderRangeText();
    }

    let calendars = [];
    let initialEvents = [];
    useEffect(()=>{
        if(teacherData.lectures){
            teacherData.lectures.map((lecture, lecture_index) => {
                calendars.push({
                    id: lecture.id,
                    name: lecture.name,
                    backgroundColor: colors[lecture_index],
                    borderColor: colors[lecture_index]
                });
            })}        
        console.log(calendars);
    },[teacherData])

    useEffect(()=>{
    if(lessonsData){        
        lessonsData.map((lesson) => {
            initialEvents.push({
                id: lesson.id,
                calendarId: lesson.lecture.id,
                title: lesson.lecture.name,
                start: lesson.date + "T" + lesson.start_time,
                end: lesson.date + "T" + lesson.end_time,
                state: null,
                attendees: null,
            });
        })}
    console.log(initialEvents);
    },[lessonsData])

     // 시간표 필터링
    const idArray = [];
    if(teacherData.lectures){
    teacherData.lectures.forEach((el) => idArray.push(el.id));
    }   
    const [checkItems, setCheckItems] = useState(idArray);

    const handleSingleCheck = (checked, id) => {
        if (checked) {
        setCheckItems(prev => [...prev, id]);
        calendarInst = cal.current.getInstance();
        calendarInst.setCalendarVisibility(id, true);
        } else {
        setCheckItems(checkItems.filter((el) => el !== id));
        calendarInst = cal.current.getInstance();
        calendarInst.setCalendarVisibility(id, false);
        }
    };

    const handleAllCheck = (checked) => {
        if(checked) {
        idArray = [];
        if(teacherData.lectures){
        teacherData.lectures.forEach((el) => idArray.push(el.id));
        }
        setCheckItems(idArray);
        calendarInst = cal.current.getInstance();
        calendarInst.setCalendarVisibility(idArray, true);
        }
        else {
        setCheckItems([]);
        calendarInst = cal.current.getInstance();
        calendarInst.setCalendarVisibility(idArray, false);
        }
    }

    // 이벤트 상세
    const calendarEventDetailModalOpen = useSelector((state)=>state.modal.show);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const clickEvent = (ev) => {
        setSelectedEvent(ev.event);
        dispatch(fetchLesson(ev.event.id));
        dispatch(modalClose("addCalendarEventModal"));
        dispatch(modalOpen("calendarEventDetailModal"));
    }
 
    //일정 변경하기
    
    const beforeUpdateEvent = (ev) => {
        console.log(ev);
        var event = ev.event;
        var changes = ev.changes;
        const startr=new Date(changes.start);
        const endr=new Date(changes.end);
        if (changes && !changes.isAllDay && event.category === 'allday') {
            changes.category = 'time';
        }
        const editedLesson = {date: moment(startr).format("YYYY-MM-DD"), 
                            start_time:moment(startr).format("HH:mm"), 
                            end_time: moment(endr).format("HH:mm")};
        dispatch(updateLesson({editedLesson:editedLesson,lessonId:event.id}));
        calendarInst = cal.current.getInstance();
        calendarInst.updateEvent(event.id, event.calendarId, changes);
    }

    const onUpdate = ( {lessonId, calendarId, changes}) => {
        calendarInst = cal.current.getInstance();
        calendarInst.updateEvent(lessonId, calendarId, changes);
    }

    // 일정 삭제하기
    const onDelete = (event) => {
        dispatch(deleteLesson(event.id));
        calendarInst = cal.current.getInstance();
        calendarInst.deleteEvent(event.id, event.calendarId);        
    }

    //일정 생성 모달 popup
    const [selectedDate, setSelectedDate] = useState(null);
    const openFormPopup = (ev) => {       
        const startr=new Date(ev.start);        
        setSelectedDate(moment(startr).format("YYYY-MM-DD"));
        dispatch(modalClose("calendarEventDetailModal"));
        dispatch(modalOpen("addCalendarEventModal"));
    }
    const clearBox = ()=>{
        calendarInst = cal.current.getInstance();
        calendarInst.clearGridSelections();
    }
    function createNewEvent(newEvent){
        calendarInst = cal.current.getInstance();
        calendarInst.createEvents([newEvent]);
    }
    

    return (
        <div>
            <ContentTitle title="강의 시간표" mainTitle="My Space" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-header bg-soft bg-primary">
                        <div className="justify-content-between d-flex align-items-center">
                            <h5 className="fw-semibold mt-2">강의 선택</h5>
                            <div className="form-check form-switch form-switch-sm" >
                                <label className="form-check-label" htmlFor="SwitchCheckSizemd" >전체 선택</label>
                                <input className="form-check-input me-2" type="checkbox" id="SwitchCheckSizemd" 
                                checked={checkItems.length === teachersData.length ? true : false} 
                                onChange={(e) => handleAllCheck(e.target.checked)}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">                         
                            <ul className="list-unstyled categories-list">
                                {teacherData.lectures?teacherData.lectures.map((lecture, lecture_index) => {
                                    return (<li key={lecture_index} className="mb-1" >
                                        <div className="custom-accordion">
                                            <a className="text-body fw-medium py-1 d-flex align-items-center">
                                                <i className="font-size-15 text-warning me-2">
                                                    <BiUser color={colors[lecture_index]} />
                                                </i>
                                                {lecture.name}
                                                <input type="checkbox" className="form-check-input ms-2"
                                                    style={{ backgroundColor: colors[lecture_index], borderColor: colors[lecture_index] }}                                                
                                                    name={`select-${lecture.id}`}
                                                    onChange={(e) => handleSingleCheck(e.target.checked, lecture.id)}
                                                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                                    checked={checkItems.includes(lecture.id) ? true : false} />
                                            </a>
                                        </div>
                                    </li>)
                                }):<></>}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="card mb-2 position-static">
                        <div className="card-body">
                            <div>
                                <div id="menu" className="mb-3">
                                    <span className="d-sm-flex flex-wrap text-center text-sm-start justify-content-sm-between">
                                        <div className="d-sm-flex flex-wrap gap-1">
                                            <div className="btn-group mb-2">
                                                <button type="button" className="btn btn-primary move-day"
                                                    onClick={handleClickPrev}>
                                                    <BiChevronLeft />
                                                </button>
                                                <button type="button" className="btn btn-primary move-day"
                                                    onClick={handleClickNext}>
                                                    <BiChevronRight />
                                                </button>
                                            </div>
                                            <button type="button" className="btn btn-primary move-today mb-2"
                                                onClick={handleClickToday}>Today</button>
                                        </div>

                                        <h4 className="render-range fw-bold pt-1 mx-3">{dateRangeText}</h4>

                                        <div className="dropdown align-self-start mt-3 mt-sm-0 mb-2" >
                                            <button id="dropdownMenu-calendarType" className="btn btn-primary" type="button" onClick={(e) => viewDropdownHandler(e)}>
                                                <BiCalendar className="me-2" />
                                                <span>{view}</span>
                                                <BiChevronDown />
                                            </button>
                                            <ul className={viewDropdown ? "dropdown-menu show" : "dropdown-menu"}>
                                                <li>
                                                    <a className="dropdown-item" onClick={dailyViewHandler}>
                                                        Daily
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" onClick={weeklyViewHandler}>
                                                        Weekly
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" onClick={monthlyViewHandler}>
                                                        Monthly
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </span>

                                </div>
                            </div>
                            <div>
                                <div id="calendar">                                  
                                    <TimeTable
                                    ref={cal}
                                    view={view}
                                    month={{
                                        startDayOfWeek: 1,
                                        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                                        isAlways6Weeks: false,
                                    }}
                                    week={{
                                        taskView: false,
                                        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                                    }}
                                    useDetailPopup={false}
                                    useFormPopup={false}
                                    calendars={calendars}
                                    events={initialEvents}
                                    onAfterRenderEvent={onAfterRenderEvent}                                    
                                    usageStatistics={false}
                                    onBeforeUpdateEvent={beforeUpdateEvent} 
                                    onSelectDateTime ={openFormPopup}
                                    onClickEvent = {clickEvent}
                                    />
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddCalendarEventModal
                modalId={"addCalendarEventModal"}
                ModalOpen={modalOpenState}
                date={selectedDate}
                clear={clearBox}
                onCreate={createNewEvent}
                />
            <CalendarEventDetailModal
                modalId={"calendarEventDetailModal"}
                ModalOpen={modalOpenState}
                event={selectedEvent}        
                onDelete={onDelete}    
                colors={colors}
                />
            <CalendarEventUpdateModal
                modalId={"calendarEventUpdateModal"}
                ModalOpen={modalOpenState}
                event={selectedEvent} 
                onUpdate={onUpdate}
            />
        </div>
    )

}

TeacherLectureTimeTablePage.layout = "L1";

export default TeacherLectureTimeTablePage


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchLectures());

    const teachersData = store.getState().teachers.teachersData;
    const colors = randomColor({count: teachersData.length, seed:0});

    return { props: { teachersData, colors }, };

});