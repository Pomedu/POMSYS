import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko"
import { useCookies } from 'react-cookie';
import router from "next/router";
import { logoutAccount } from "../../store/modules/accountsSlice";

export default function AdminTopbar(props) {
  const showMenu = () => {
    props.onChange(sidebarisOpen => !sidebarisOpen);
  }

  const userData = useSelector(state => state.accounts.userData);
  const [cookies, setCookies, removeCookies] = useCookies(['accessToken, refreshToken']);
  const dispatch = useDispatch();
  const onLogout = (e) => {
    e.preventDefault();
    removeCookies('refreshToken',{path:'/admin'});
    removeCookies('accessToken',{path:'/admin'});
    dispatch(logoutAccount());
    router.push('/admin/login')
   //
  };

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link href={"/admin"}>
              <a className="logo logo-light">
                <span className="logo-sm">
                  <Image src='/images/logo.svg' height="22px" width="22px"/>
                </span>
                <span className="logo-lg">
                  <Image src='/images/logo-light.png' height="22px" width="60px" />
                </span>
              </a>
            </Link>
          </div>
          <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn" onClick={() => showMenu()}>
            <FaBars/>
          </button>
        </div>

        <div className="d-flex">
          <span>{userData.name}님 환영합니다</span>
          <a className="ms-3 fw-semibold text-primary clickable" onClick={onLogout}> 로그아웃 <FaSignOutAlt/></a>
        </div>
      </div>
    </header>
  );



}

