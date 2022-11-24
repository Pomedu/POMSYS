import React from "react";
import Link from "next/link";
import LoginForm from "../../components/Forms/LoginForm";
import RegistrationForm from "../../components/Forms/RegistrationForm";

const AdminRegistrationPage = () => {

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
            }}>
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card overflow-hidden ">
                            <div style={{ backgroundColor: "#2a3042" }}>
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-white p-4">
                                            <h5 className="text-white">회원가입</h5>
                                            <p>POMSYS 관리자 회원가입</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="p-2">
                                <RegistrationForm/> 
                                </div>      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminRegistrationPage.layout = "L3";

export default AdminRegistrationPage