import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import router from "next/router";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState(
        {
            phone_number: '', password: '',
        }
    );

    const handleFormChange = (event) => {
        if(event.target.name=="phone_number"||event.target.name=="phone_number_P"){
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        setInputFields({ ...inputFields, [event.target.name]: event.target.value });
    };

    const onLogin = (e) => {
        e.preventDefault();
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
                </div>
            </div>
            <div className="row">
                <div className="mt-3 d-grid">
                    <button className="btn btn-primary waves-effect waves-light" type="submit">로그인</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm