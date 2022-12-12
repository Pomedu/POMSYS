import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { loginAccount, resetErrors } from "../../store/modules/accountsSlice";
import { useCookies } from 'react-cookie';
import moment from "moment";

const LoginForm = () => {
    const errors = useSelector(state=>state.accounts.error);    
    const userData = useSelector(state=>state.accounts.userData);    
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(
        {
            phone_number: '', password: '',
        }
    );

    const handleFormChange = (event) => {
        if(event.target.name=="phone_number"){
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const [cookies, setCookies] = useCookies(['accessToken','refreshToken']);

    const onLogin = (e) => {
        e.preventDefault();
        dispatch(loginAccount(inputFields))
        .then((res)=>{
            if(res.type=='LOGIN/fulfilled'){
                console.log(res);
                const accessTokenExpires =  moment().add('1','minutes').toDate()
                const refreshTokenExpires =  moment().add('7','days').toDate()
                console.log(accessTokenExpires);
                setCookies('accessToken',res.payload.access_token,{expires:accessTokenExpires})                
                setCookies('refreshToken',res.payload.refresh_token,{expires:refreshTokenExpires})
                router.push("/admin");                
            } else {
                alert("로그인에 실패하였습니다");
                setTimeout(()=>{dispatch(resetErrors())},3000);
            }            
            });
       //
    };

    return (
        <div className="mt-3">          
            <div className="row mb-2">
                <div>
                    <input
                        name='phone_number'
                        placeholder='전화번호'
                        className="form-control"
                        value={inputFields.phone_number}
                        onChange={event => handleFormChange(event)}
                    />
                    {errors?<span className="text-danger">{errors.phone_number}</span>:""}
                </div>
            </div>
            <div className="row mb-3">
                <div>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className="form-control"
                        value={inputFields.password}
                        onChange={event => handleFormChange(event)}
                    />
                    {errors?<span className="text-danger">{errors.password}</span>:""}
                </div>
            </div>
            {errors?<span className="text-danger">{errors.non_field_errors}</span>:""}
            <div className="row">   
                <div className="mt-3 d-grid">
                    <button className="btn btn-primary waves-effect waves-light" onClick={onLogin}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm