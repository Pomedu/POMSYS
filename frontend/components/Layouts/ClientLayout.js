import Link from 'next/link';
import React from 'react';

const ClientLayout = ({ children }) => {
    return (
        <div className='client-background'>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh)' }}>
                    <div >
                        {children}
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default ClientLayout