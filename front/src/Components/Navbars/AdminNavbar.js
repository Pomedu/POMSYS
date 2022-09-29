import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavbar.css';
import IonIcon from '@reacticons/ionicons';

function MoveToHomePage() {
window.location.replace("student/");
}

const AdminNavbar = () => {

      return (
    <div className="vertical-menu">
            <div data-simplebar className="h-100">
            <div className="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li>
                        <NavLink to="/manage/lectures" className={({isActive})=> isActive? "mm-active":""}>
                            <i><IonIcon name="folder-outline"/></i>
                            <span>강의관리</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage/students" className={({isActive})=> isActive? "mm-active":""}>
                            <i><IonIcon name="folder-outline"/></i>
                            <span>학생관리</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage/teachers" className={({isActive})=> isActive? "mm-active":""}>
                            <i><IonIcon name="folder-outline"/></i>
                            <span>강사관리</span>
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={() => {
                            MoveToHomePage();
                            }}>
                            <i><IonIcon name="home"></IonIcon ></i>
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