import React from 'react';
import { Link,useMatch,useResolvedPath } from 'react-router-dom';
import './Navbar.css';

export default function ClientNavbar() {
    return (
        <div className="root-nav">
            <div className='root-nav-list'>
                <div className='root-nav-button-container'>
                    <span className='tap-button'>강의실</span>
                </div>
                <div className='root-nav-button-container'>
                    <span className='tap-button'>시간표</span>
                </div>
                <div className='root-nav-button-container'>
                    <span className='tap-button'>학습현황</span>
                </div>
                <div className='root-nav-button-container'>
                    <span className='tap-button'>프로필</span>
                </div>
            </div>
        </div>
    )
   
}

function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:false})
    return (
        <div className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </div>
    )
}