import Link from 'next/link';
import React from 'react';
import Footer from '../Footers/Footer';

const NoneLayout = ({ children }) => {
    return (
        <div >             
            {children}                    
        </div>
    );
};

export default NoneLayout