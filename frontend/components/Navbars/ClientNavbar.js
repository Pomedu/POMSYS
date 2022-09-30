import React from 'react';

const ClientNavbar=() => {
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

export default ClientNavbar;