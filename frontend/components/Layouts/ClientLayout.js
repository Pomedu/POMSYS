import Link from 'next/link';
import React from 'react';
import Footer from '../Footers/Footer';
import ClientNavbar from '../Navbars/ClientNavbar';

const ClientLayout = ({ children }) => {
    return (
        <div className='client-layout'>
            <div className='main-header'>
                <Link href={'/student'} style={{ textDecoration: 'none', margin: '10px 0 10px 0' }}>
                    <div className="title">
                        <div className="title-name">POMSYS</div>
                    </div>
                </Link>
            </div>
            <ClientNavbar />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh - 125px)' }}>
                    {children}
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ClientLayout