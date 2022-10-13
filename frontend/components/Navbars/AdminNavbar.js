import React from 'react';
import IonIcon from '@reacticons/ionicons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faFileSignature, faUserCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons';


function MoveToHomePage() {
    window.location.replace("student/");
}

const AdminNavbar = () => {
    const router = useRouter();

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title" key="t-apps">업무</li>
                        <li>
                            <Link href={"/admin/lectures"}>
                                <a className={router.pathname === '/admin/lectures' ? "mm-active" : ''}>
                                    <i><FontAwesomeIcon icon={faBox} /></i>
                                    <span>강의관리</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/teachers"}>
                                <a className={router.pathname === '/admin/teachers' ? "mm-active" : ''}>
                                <i><FontAwesomeIcon icon={faUserCircle} /></i>
                                    <span>강사관리</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/students"}>
                                <a className={router.pathname === '/admin/students' ? "mm-active" : ''}>
                                <i><FontAwesomeIcon icon={faUserGroup} /></i>
                                <span>학생관리</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/enrolls"}>
                                <a className={router.pathname === '/admin/enrolls' ? "mm-active" : ''}>
                                <i><FontAwesomeIcon icon={faFileSignature} /></i>
                                <span>수강관리</span>
                                </a>
                            </Link>
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