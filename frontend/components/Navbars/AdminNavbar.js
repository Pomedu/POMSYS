import React from 'react';
import IonIcon from '@reacticons/ionicons';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MoveToHomePage() {
    window.location.replace("student/");
}

const AdminNavbar = () => {
    const router = useRouter();

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                <div className="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li>
                            <Link href={"/admin/lectures"}>
                                <a className={router.pathname === '/admin/lectures' ? "mm-active" : ''}>
                                    <i><IonIcon name="folder-outline" /></i>
                                    <span>강의관리</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/lectures"}>
                                <a className={router.pathname === '/admin/lectures' ? "mm-active" : ''}>
                                    <i><IonIcon name="folder-outline" /></i>
                                    <span>강의관리</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/admin/lectures"}>
                                <a className={router.pathname === '/admin/lectures' ? "mm-active" : ''}>
                                <i><IonIcon name="folder-outline" /></i>
                                <span>강의관리</span>
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