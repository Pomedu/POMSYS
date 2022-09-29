import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import MetaTag from '../../MetaTags/SEOMetaTag';
import Footer from '../Footers/Footer';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminTopbar from '../Navbars/AdminTopbar';
import './AdminLayout.css';


export default () => {
    // 모바일,PC 확인
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 992;

    const [sidebarisOpen, setSidebar] = useState(true); //

    return (
        <div
            className={
                sidebarisOpen
                    ? ""
                    : isMobile
                        ? "sidebar-enable"
                        : "vertical-collpsed sidebar-enable"
            }
        >
            <MetaTag title={`POMSYS | 관리자`} />
            <AdminTopbar
                sidebarisOpen={sidebarisOpen}
                onChange={(isOpen) => setSidebar(isOpen)}
            />
            <AdminNavbar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};