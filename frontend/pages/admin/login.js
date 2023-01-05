import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoginForm from "../../components/Forms/LoginForm";
import { useCookies } from 'react-cookie';
import router from "next/router";
import { useDispatch } from "react-redux";
import { refreshAccount, verifyAccount } from "../../store/modules/accountsSlice";
import moment from "moment";
import "moment/locale/ko";

const AdminLoginPage = () => {
    const [cookies, setCookies] = useCookies(['accessToken, refreshToken']);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(cookies.accessToken){
            dispatch(verifyAccount({ token: cookies.accessToken }))
                .then((res)=>{
                    alert("이미 로그인되어 있습니다");
                    router.push('/admin');
                });
        }
    },[])

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
                            <div style={{ backgroundColor: "rgba(162, 162, 162)" }}>
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-white p-4">
                                            <h5 className="text-white">환영합니다</h5>
                                            <p>POMSYS 강사/관리자 로그인</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="p-2">
                                    <LoginForm />
                                    <div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <a className="text-muted"><i className="mdi mdi-lock me-1"></i> 비밀번호를 잊으셨나요?</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-4 text-center text-white">
                            <div>
                                <p>계정이 없으신가요? <Link href={"/admin/registration"}><a className="fw-medium text-primary"> 가입하기 </a></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

AdminLoginPage.layout = "L3";

export default AdminLoginPage