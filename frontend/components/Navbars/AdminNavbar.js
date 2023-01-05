import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminNavbarMenu from './AdminNavebarMenu';
import AdminNavbarMenuCollapse from './AdminNavbarMenuCollapse';
import { BiHome } from "react-icons/bi";
import router from "next/router";
import { useSelector } from 'react-redux';

function MoveToHomePage() {
    window.location.replace("/admin");
}

function MoveToClientPage() {
    window.location.replace("/client");
}

const AdminNavbar = (props) => {
    const router = useRouter();
    const userData = useSelector(state=>state.accounts.userData);
    const lectureSubmenu = [{url:"/admin/lectures", menuName:"강의 리스트"}, 
                             {url:"/admin/lectures/create", menuName:"신규 강의 등록"},
                             {url:"/admin/enrolls", menuName:"수강 관리"},
                             {url:"/admin/enrolls/create", menuName:"신규 수강 등록"},
                             {url:"/admin/lessons", menuName:"일일 수업 관리"}];
    const studentSubmenu = [{url:"/admin/students", menuName:"학생 리스트"},
                             {url:"/admin/students/create", menuName:"신규생 등록"}, 
                            ];
    const teacherSubmenu = [{url:"/admin/teachers", menuName:"강사 리스트"}, 
                             {url:"/admin/teachers/create", menuName:"신규 강사 등록"}, 
                             {url:"/admin/teachers/timetable", menuName:"강의 시간표"},
                            ];
    const mySubmenu = [{url:"/admin/teachers/timetable_T", menuName:"강의 시간표"},]
    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li>
                            <a onClick={() => {
                                MoveToHomePage();
                            }}>
                                <i><BiHome/></i>
                                <span>홈</span>
                            </a>
                        </li>
                        <li className="menu-title" key="t-apps">업무</li>
                        {userData.role=='T'?<AdminNavbarMenuCollapse setSidebar={props.setSidebar} isMobile={props.isMobile}
                            name="My Space"
                            icon="BiUserCircle"
                            submenu={mySubmenu}/>:<></>}
                        <AdminNavbarMenuCollapse setSidebar={props.setSidebar} isMobile={props.isMobile}
                            name="강의관리"
                            icon="BiBox"
                            submenu={lectureSubmenu}/>
                        {userData.role=='A'?<AdminNavbarMenuCollapse setSidebar={props.setSidebar} isMobile={props.isMobile}
                            name="강사관리"
                            icon="BiUserCircle"
                            submenu={teacherSubmenu}/>:<></>}
                        <AdminNavbarMenuCollapse setSidebar={props.setSidebar} isMobile={props.isMobile}
                            name="학생관리"
                            icon="BiFace"
                            submenu={studentSubmenu}/>
                        <li>
                            <a onClick={() => {
                                MoveToClientPage();
                            }}>
                                <i><BiHome/></i>
                                <span>학생 홈페이지</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;