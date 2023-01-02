import React, { useEffect, useState } from 'react';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminTopbar from '../Navbars/AdminTopbar';
import Script from 'next/script'
import { Router, useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getuserAccount, refreshAccount, verifyAccount } from '../../store/modules/accountsSlice';
import moment from 'moment';
import "moment/locale/ko"

const AdminLayout = ({ children }) => {
    // token 확인    
    const router = useRouter();
    const [cookies, setCookies] = useCookies(['accessToken, refreshToken']);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.accounts.userData);

    useEffect(() => {
        if (!cookies.accessToken) {
            if (!cookies.refreshToken) {
                router.push('/admin/login');
            } else {
                console.log('refreshtoken으로 인증합니다');
                dispatch(verifyAccount({ token: cookies.refreshToken }))
                .then((res) => {
                    dispatch(refreshAccount({ refresh: cookies.refreshToken }))
                    .then((res) => {
                        const accessTokenExpires = moment().add('10', 'minutes').toDate();
                        setCookies('accessToken', res.payload.access, { expires: accessTokenExpires });
                        dispatch(getuserAccount(res.payload.access));
                    });
                })
                .catch((error)=>{                    
                    alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                    router.push('/admin/login');         
                })                
            }
        } else {
            console.log('accesstoken으로 인증합니다', cookies.accessToken);
            dispatch(verifyAccount({ token: cookies.accessToken }))
                .then((res) => {
                    dispatch(getuserAccount(cookies.accessToken));  
                })
                .catch((error)=>{                    
                    alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                    router.push('/admin/login');         
                });
        }
    }, [children]);

    useEffect(()=>{
        if(userData.role){
            if(userData.role=='S'){
                alert('관리자/강사 계정이 아닙니다. 학생 페이지로 이동합니다');
                router.push('/client');
            } 
        }
    },[userData])

    // 모바일,PC 확인
    function useWindowSize() {

        const [windowSize, setWindowSize] = useState();

        useEffect(() => {

            if (typeof window !== 'undefined') {

                function handleResize() {

                    setWindowSize(window.innerWidth);
                }

                window.addEventListener("resize", handleResize);

                handleResize();


                return () => window.removeEventListener("resize", handleResize);
            }
        }, []);
        return windowSize;
    }

    const windoWidth = useWindowSize();
    const isMobile = windoWidth <= 992;

    const [sidebarisOpen, setSidebar] = useState(true); //

    useEffect(() => {
        if (isMobile) {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("")
            } else {
                document.querySelector("body").className = ("sidebar-enable")
            }
        } else {
            if (sidebarisOpen) {
                document.querySelector("body").className = ("sidebar-enable")
            } else {
                document.querySelector("body").className = ("vertical-collpsed")
            }
        }

    }, [sidebarisOpen, isMobile]);
    
    return (
        <div>
            <AdminTopbar
                sidebarisOpen={sidebarisOpen}
                onChange={(isOpen) => setSidebar(isOpen)}
            />
            <AdminNavbar setSidebar={setSidebar} isMobile={isMobile} />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid h-100">
                        {children}
                    </div>
                </div>
            </div>
            <Script src="../../libs/simplebar/dist/simplebar.min.js" strategy="lazyOnload" />
            <Script src="../../libs/node-waves/dist/waves.min.js" strategy="lazyOnload" />
        </div>
    );      
};

export default AdminLayout