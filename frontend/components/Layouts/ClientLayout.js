import Link from 'next/link';
import React from 'react';
import Footer from '../Footers/Footer';

const ClientLayout = ({ children }) => {
    return (
        <div className='client-background'>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh)' }}>
                    <div >
                    <div className="client-main-logo">
                        <img src="/images/Client_logo.png"/>
                    </div>
                        {children}
                    </div>                
                </div>
            </div>
        </div>
    );
};

export default ClientLayout