import React from "react";
import { Link } from "react-router-dom";
import "./AdminTopbar.css"
import IonIcon from "@reacticons/ionicons";


export default function AdminTopbar(props) {
  const showMenu = () => {
          props.onChange(sidebarisOpen => !sidebarisOpen); 
      }
  

  
    return (
      <header className="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                      <Link to="/admin" className="adminlogo adminlogo-light">
                          <span className="adminlogo-sm">
                            🤔
                          </span>
                          <span className="adminlogo-lg">
                            🤔POMSYS Admin
                          </span>
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

