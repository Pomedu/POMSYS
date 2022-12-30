import React, { useEffect } from "react";
import Link from "next/link";
import ClientLoginForm from "../../components/Forms/ClientLoginForm";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../store/modules/accountsSlice";
import router from "next/router";

const ClientLoginPage = () => {
    const [cookies, setCookies] = useCookies(['accessToken, refreshToken']);
    const dispatch = useDispatch()
    useEffect(()=>{
        if(cookies.accessToken){
            dispatch(verifyAccount({ token: cookies.accessToken }))
                .then((res)=>{
                    alert("이미 로그인되어 있습니다");
                    router.push('/client');
                });
        }
    },[])
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
                            <p className="text-light">계정이 없으신가요? <Link href={"/client/registration"}><a className="fw-medium text-info"> 가입하기 </a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

ClientLoginPage.layout = "L3";

export default ClientLoginPage