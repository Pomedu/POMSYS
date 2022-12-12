import React from "react";
import Link from "next/link";
import LoginForm from "../../components/Forms/LoginForm";
import ClientLoginForm from "../../components/Forms/ClientLoginForm";

const ClientLoginPage = () => {

    return (
        <div className="m-0">
            <div className="client-login-logo">
                <img src="../images/Client_logo.png"/>
            </div>            
            <div className="client-login-box">
                <div>
                    <div>
                        <ClientLoginForm />
                        <div>
                        </div>
                        <div className="mt-4 text-center">
                            <a className="text-light"><i className="mdi mdi-lock me-1"></i> 비밀번호를 잊으셨나요?</a>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <div>
                            <p className="text-light">계정이 없으신가요? <Link href={"/client/registration"}><a className="fw-medium text-primary"> 가입하기 </a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

ClientLoginPage.layout = "L3";

export default ClientLoginPage