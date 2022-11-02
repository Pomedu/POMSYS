import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

export default function AdminTopbar(props) {
  const showMenu = () => {
    props.onChange(sidebarisOpen => !sidebarisOpen);
  }


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
          Admin님 환영합니다
        </div>
      </div>
    </header>
  );



}

