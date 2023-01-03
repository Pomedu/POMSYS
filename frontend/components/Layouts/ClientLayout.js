import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../Footers/Footer';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getuserAccount, refreshAccount, verifyAccount } from '../../store/modules/accountsSlice';
import moment from 'moment';
import "moment/locale/ko";
import ClientNavbar from '../Navbars/ClientNavbar';

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
                console.log('refreshtoken으로 인증합니다');
                dispatch(verifyAccount({ token: cookies.refreshToken }))
                .then((res) => {
                    dispatch(refreshAccount({ refresh: cookies.refreshToken }))
                    .then((res) => {
                        const accessTokenExpires = moment().add('10', 'minutes').toDate();
                        setCookies('accessToken', res.payload.access, {path:'/client', expires:accessTokenExpires});
                        dispatch(getuserAccount(res.payload.access));
                    });
                })
                .catch((error)=>{                    
                    alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                    router.push('/client/login');         
                })                
            }
        } else {        
            console.log('accesstoken으로 인증합니다');
            dispatch(verifyAccount({ token: cookies.accessToken }))
                .then((res) => {
                    dispatch(getuserAccount(cookies.accessToken));      
                })
                .catch((error)=>{                    
                    alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                    router.push('/client/login');         
                });
        }
    }, [children]);
    useEffect(()=>{
        if(userData.role){
            console.log(userData);
            if(userData.role!='S'){
                alert('학생계정이 아닙니다. 관리자/강사 페이지로 이동합니다');
                router.push('/admin');
            } 
        }
    },[userData])

    // Navbar 오픈 
    const [sidebarisOpen, setSidebar] = useState(false); 
    
    return (
        <div className='client-background'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-viewport-area' style={{ flex: 1, flexBasis: 'calc(100vh)' }}>
                    <div>
                        <div className="client-main-logo">
                            <img src="/images/Client_logo.png" />
                            <ClientNavbar
                                sidebarisOpen={sidebarisOpen}
                                onChange={(isOpen) => setSidebar(isOpen)}/>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientLayout