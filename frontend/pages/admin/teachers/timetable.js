import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachers } from "../../../store/modules/teachersSlice";
import "moment/locale/ko"
import ContentTitle from "../../../components/Common/ContentTitle";
import { useRouter } from "next/router";
import { fetchLectureLessons, fetchLessons, fetchTeacherLessons } from "../../../store/modules/lessonsSlice";
import { BiUser, BiChevronDown, BiChevronUp, BiChalkboard, BiChevronLeft, BiChevronRight, BiCalendar, BiCircle, BiBoltCircle } from 'react-icons/bi'
import dynamic from 'next/dynamic'
import moment from "moment";
import { fetchLessonTests } from "../../../store/modules/testsSlice";
import wrapper from "../../../store/configureStore";

const TuiCalendar = dynamic(() => import('../../../components/Common/TuiCalendar'), {
    ssr: false
});
const CalendarComponent = React.forwardRef((props, ref) => <TuiCalendar {...props} forwardedRef={ref} />);


const AdminLectureTimeTablePage = ({ teachersData, lessonsData, upcomingLessonsData, completedLessonsData, colors }) => {

    const [selectedTeacher, setSelectedTeacher] = useState({ id: null, name: null });
    const selectedTeacherHandler = (teacher) => {
        if (selectedTeacher.id == teacher.id) {
            setSelectedTeacher({ id: null, name: null });
        } else {
            setSelectedTeacher({ id: teacher.id, name: teacher.name });
        }
    }

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

    const onAfterRenderEvent = (event) => {
        calendarInst = cal.current.getInstance();
        setRenderRangeText();
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
    const calendars = [];
    const initialEvents = [];

    teachersData.map((teacher, teacher_index)=>{
        calendars.push({
            id: teacher.name,
            name: teacher.name,
            bgColor: colors[teacher_index],
            borderColor: colors[teacher_index]
        });
    })


    lessonsData.map((lesson)=>{
        initialEvents.push({
            id: lesson.id,
            calendarId: lesson.lecture.teacher,
            title: lesson.lecture.name,
            start: lesson.date+"T"+lesson.start_time,
            end: lesson.date+"T"+lesson.end_time,
        });
    })

    return (
        <div>
            <ContentTitle title="강의 시간표" mainTitle="강의 관리" />
            <div className="d-xl-flex">
                <div className="card filemanager-sidebar me-md-2">
                    <div className="card-body">
                        <div className="d-flex flex-column h-100">
                            <ul className="list-unstyled categories-list">
                                {teachersData.map((teacher, teacher_index) => {
                                    return (<li key={teacher_index} className="mb-1" >
                                        <div className="custom-accordion">
                                            <a className="text-body fw-medium py-1 d-flex align-items-center"
                                                onClick={() => selectedTeacherHandler(teacher)}>
                                                <i className="font-size-15 text-warning me-2">
                                                    <BiUser color={selectedTeacher.id == teacher.id ? "#2A3042" : "#CDCDCD"} />
                                                </i>
                                                {teacher.name}({teacher.subject})
                                                <i className="font-size-15 text-warning me-2">
                                                    <BiBoltCircle color={colors[teacher_index]} />
                                                </i>
                                            </a>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <div className={selectedTeacher.id !== null ? "card border border-success mb-2" : "card border border-danger mb-2"}>
                        <div className="card-header bg-transparent border-danger">
                            <h5 className={selectedTeacher.id !== null ? "my-0 text-success" : "my-0 text-danger"}>
                                {selectedTeacher.id !== null ? selectedTeacher.name : "강사를 선택해주세요"}
                            </h5>
                        </div>
                    </div>
                    <div className="card mb-2">
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
                            <div className="h-100">
                                <CalendarComponent
                                    ref={cal}
                                    view={view}
                                    month={{
                                        startDayOfWeek: 1,
                                        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                                    }}
                                    week={{
                                        taskView: false,
                                        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                                    }}
                                    useDetailPopup={true}
                                    calendars={calendars}
                                    events={initialEvents}
                                    onAfterRenderEvent={onAfterRenderEvent}
                                    usageStatistics={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLectureTimeTablePage.layout = "L1";

export default AdminLectureTimeTablePage


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchLessons());

    const teachersData = store.getState().teachers.teachersData;
    const lessonsData = store.getState().lessons.lessonsData;
    const upcomingLessonsData = store.getState().lessons.upcomingLessonsData.slice(0, 3);
    const completedLessonsData = store.getState().lessons.completedLessonsData;

    const colors = [];
    teachersData.map((teacher)=>colors.push('#' + Math.floor(Math.random()*16777215).toString(16)))

    return { props: { teachersData, lessonsData, upcomingLessonsData, completedLessonsData, colors }, };

});