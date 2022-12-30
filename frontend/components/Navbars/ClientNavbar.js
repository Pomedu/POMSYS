import Link from 'next/link';
import React from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import router from "next/router";
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../../store/modules/accountsSlice';

const ClientNavbar=(props) => {
    
    const showMenu = () => {
        props.onChange(sidebarisOpen => !sidebarisOpen);
      }
    
    // 로그아웃
    const [cookies, setCookies, removeCookies] = useCookies(['accessToken, refreshToken']);
    const dispatch = useDispatch();
    const onLogout = (e) => {
        e.preventDefault();
        removeCookies('refreshToken',{path:'/client'});
        removeCookies('accessToken',{path:'/client'});
        dispatch(logoutAccount());
        router.push('/client/login')
        //
    };

    return (
        <div className={props.sidebarisOpen?"dropdown float-end show":"dropdown float-end" }>            
            <button type="button" className="btn btn-sm px-3 font-size-16 waves-effect text-white" onClick={() => showMenu()}>
                <FaBars/>
            </button>
            <div className={props.sidebarisOpen?"dropdown-menu dropdown-menu-end show":"dropdown-menu dropdown-menu-end" }>   
                    <Link href='/client'><a className="dropdown-item fw-semibold">홈</a></Link>                         
                    <Link href='/client/lectureroom'><a className="dropdown-item fw-semibold">나의 강의실</a></Link>
                    <div className="dropdown-divider"></div> 
                    <a className="dropdown-item fw-semibold text-primary clickable" onClick={onLogout}> 로그아웃 <FaSignOutAlt/></a>
            </div>
        </div>
    )
   
}

export default ClientNavbar;