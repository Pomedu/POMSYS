import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { registerAccount, resetErrors } from "../../store/modules/accountsSlice";

const ClientRegistrationForm = () => {
    const errors = useSelector(state=>state.accounts.error);

    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(
        {
            phone_number: '', password1: '', password2: '', name: '', role: 'S'
        }
    );

    const handleFormChange = (event) => {
        if(event.target.name=="phone_number"){
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const onRegister= (e) => {
        e.preventDefault();
        dispatch(registerAccount(inputFields))
        .then((res)=>{
            if(res.type=='REGISTER/fulfilled'){
                alert("회원가입이 완료되었습니다");
                router.push("/client/login");
            } else {
                alert("회원가입에 실패하였습니다");                
                setTimeout(()=>{dispatch(resetErrors())},3000);
            }            
            })
    };

    return (
        <div className="mt-3">          
            <div className="row mb-3">                
                    <input
                        name='phone_number'
                        placeholder='전화번호를 입력하세요'
                        className="form-control client-input-form"
                        value={inputFields.phone_number}
                        onChange={event => handleFormChange(event)}
                    />
                    {errors?<span className="text-danger">{errors.phone_number}</span>:""}
            </div>            
            <div className="row mb-3">
                    <input
                        type="password"
                        name='password1'
                        placeholder='비밀번호 입력'
                        className="form-control client-input-form"
                        value={inputFields.password1}
                        onChange={event => handleFormChange(event)}
                    />
                    {errors?<span className="text-danger">{errors.password1}</span>:""}
            </div>
            <div className="row mb-3">               
                    <input
                        type="password"
                        name='password2'
                        placeholder='비밀번호 확인'
                        className="form-control client-input-form"
                        value={inputFields.password2}
                        onChange={event => handleFormChange(event)}
                    />
            </div>
            <div className="row mb-3">
                    <input
                        name='name'
                        placeholder='이름'
                        className="form-control client-input-form"
                        value={inputFields.name}
                        onChange={event => handleFormChange(event)}
                    />                    
            </div>
            {errors?<span className="text-danger">{errors.non_field_errors}</span>:""}
            <div className="row">
                <div className="mt-3 d-grid">
                    <button className="btn waves-effect waves-light client-login-button fw-semibold" onClick={onRegister}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default ClientRegistrationForm