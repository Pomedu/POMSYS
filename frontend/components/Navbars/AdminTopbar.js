import React from "react";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";

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
                  <img src='images/logo.svg' style={{ height: "22px" }} />
                </span>
                <span className="logo-lg">
                  <img src='images/logo-light.png' style={{ height: "22px" }} />
                </span>
              </a>
            </Link>
          </div>
          <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn" onClick={() => showMenu()}>
            <IonIcon  name="menu-outline" />
          </button>
        </div>

        <div className="d-flex">
          Admin님 환영합니다
        </div>
      </div>
    </header>
  );



}

