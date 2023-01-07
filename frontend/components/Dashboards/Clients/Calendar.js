
import { useState } from "react";
import { BiCalendarEvent, BiMale } from "react-icons/bi";
import { FaCalendar, FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import FsLightbox from 'fslightbox-react';
import moment from "moment";
import "moment/locale/ko"
import Link from "next/link";

const CalendarCard = (props) => {     
    
    const week = [];
    const schedules = [];
    for(var i=0;i<7;i++){
        week.push(moment().add(i,'d').format('yyyy-MM-DD'))
        schedules.push(props.lessonsData.filter(lesson=>lesson.date==String(moment().add(i,'d').format('yyyy-MM-DD'))))
        
    }

    return (
        <div className="card mt-3"> 
                <div className="card-header bg-soft font-size-12" style={{color:'#8758FF'}}> 
                    <div className="justify-content-between" style={{display:'flex'}}>
                        <div><FaCalendar/> My Calendar</div>
                        <Link href={'/client/lectureroom/calendar'}><div className="text-primary clickable">More</div></Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className='wrap-vertical'> 
                    {week.map((date, date_index)=>{
                        return(
                            <div className='mb-3' key={date_index}> 
                            {schedules[date_index].length>0?
                                <div className="fw-semibold font-size-14 mb-2 d-flex align-items-middle">
                                    <div className="me-2" style={{color:'#8758FF'}}><BiCalendarEvent/></div>
                                    <span>{date} {moment(date).format('ddd')}요일</span>
                                </div> :<></>}
                                {schedules[date_index].map(lesson=>                                
                                <div key={lesson.id} className="fw-semibold font-size-12 mb-1" style={{ color:props.colors[lesson.lecture.id], width:'200px'}}>
                                    <div>[{lesson.lecture.name}]</div>
                                    <div className="text-black font-size-12"><span>{lesson.start_time.substring(0,5)} ~ {lesson.end_time.substring(0,5)}</span></div>                            
                                </div>)
                                }           
                            </div>
                        )})}         
                    </div>
                </div>
            </div>
    );
};

export default CalendarCard