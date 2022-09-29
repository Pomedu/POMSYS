import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../Footers/Footer';
import ClientNavbar from '../Navbars/ClientNavbar';



export default () => {
    return (
        <div className='client-layout'>
            <div className='main-header'>
                <Link to='student/' style={{ textDecoration: 'none', margin: '10px 0 10px 0' }}>
                    <div className="title">
                        <img className="icon-image" src={require("../../Assets/Images/Logo48.png")} />
                        <div className="title-name">POMSYS</div>
                    </div>
                </Link>
            </div>
            <ClientNavbar />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh - 125px)' }}>
                    <Outlet />
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};