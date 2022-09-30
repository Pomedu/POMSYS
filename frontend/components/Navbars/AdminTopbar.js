import React from "react";
import IonIcon from "@reacticons/ionicons";
import Link from "next/link";

export default function AdminTopbar(props) {
  const showMenu = () => {
          props.onChange(sidebarisOpen => !sidebarisOpen); 
      }

  
    return (
      <header className="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                      <Link href={"/admin"}>
                        <a className="adminlogo adminlogo-light">
                          <span className="adminlogo-sm">
                            🤔
                          </span>
                          <span className="adminlogo-lg">
                            🤔POMSYS Admin
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="header-item px-3 font-size-20">
                     <IonIcon onClick={()=>showMenu()} name="menu-outline"/>
                    </div>
                </div>

                <div className="d-flex">
                 Admin님 환영합니다
                </div>
            </div>
        </header>
    );

    
  
  }

