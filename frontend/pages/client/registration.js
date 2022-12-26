import React from "react";
import Link from "next/link";
import LoginForm from "../../components/Forms/LoginForm";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import ClientRegistrationForm from "../../components/Forms/ClientRegistrationForm";

const ClientRegistrationPage = () => {

    return (
        <div className="m-0">
            <div className="client-login-logo">
                <img src="../images/Client_logo.png" />
            </div>
            <div className="client-login-box">
                <div>
                    <div>
                        <ClientRegistrationForm />
                    </div>
                    <div className="mt-3 text-center text-white">
                        <div>
                            <p>이미 계정이 있으신가요? <Link href={"/client/login"}><a className="fw-semibold text-info"> 로그인하기 </a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

ClientRegistrationPage.layout = "L3";

export default ClientRegistrationPage