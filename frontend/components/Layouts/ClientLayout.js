import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Footer from '../Footers/Footer';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getuserAccount, refreshAccount, verifyAccount } from '../../store/modules/accountsSlice';
import moment from 'moment';

const ClientLayout = ({ children }) => {
    // token 확인    
    const router = useRouter();
    const [cookies, setCookies] = useCookies(['accessToken, refreshToken']);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.accounts.userData);

    useEffect(() => {
        if (!cookies.accessToken) {
            if (!cookies.refreshToken) {
                router.push('/client/login');
            } else {
                dispatch(verifyAccount({ token: cookies.refreshToken }))
                .then((res) => {
                    dispatch(refreshAccount({ refresh: cookies.refreshToken }))
                    .then((res) => {
                        const accessTokenExpires = moment().add('10', 'minutes').toDate();
                        setCookies('accessToken', res.payload.access, { expires: accessTokenExpires });
                        dispatch(getuserAccount(cookies.accessToken));
                    });
                })                
            }
        } else {
            dispatch(verifyAccount({ token: cookies.accessToken }))
                .then((res) => {
                    dispatch(getuserAccount(cookies.accessToken));      
                });
        }
    }, [children]);

    useEffect(()=>{
        if(userData.role){
            if(userData.role!=='S'){
                alert('학생계정이 아닙니다. 관리자/강사 페이지로 이동합니다');
                router.push('/admin');
            } 
        }
    },[userData])

    return (
        <div className='client-background'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh)' }}>
                    <div >
                        <div className="client-main-logo">
                            <img src="/images/Client_logo.png" />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientLayout