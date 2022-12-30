import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";
import router from "next/router";

export const registerAccount = createAsyncThunk("REGISTER", async (registerData, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/',
        data: registerData
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const loginAccount = createAsyncThunk("LOGIN", async (loginData, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/accounts/login/`,
        data: loginData
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const getuserAccount = createAsyncThunk("GETUSER", async (accessToken, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/accounts/user/`,
        headers: { 
            'Content-Type': "application/json",
            'Authorization': 'Bearer '+ accessToken }
    }).then(response => { return response.data });
});

export const refreshAccount = createAsyncThunk("REFRESH", async (refreshToken, { rejectWithValue })=>{
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/token/refresh/',
        data: refreshToken
    }).then(response => { return response.data });
});

export const verifyAccount = createAsyncThunk("VERIFY", async (accessToken, { rejectWithValue })=>{
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/token/verify/',
        data: accessToken
    }).then(response => { return response.data });
});



const initialState = {
    userData: [],
    loading: false,
    error: null,
};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        resetErrors: (state) => {
            state.error = null;
        },
        logoutAccount: (state) => {
            state.userData = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(registerAccount.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload;
            })
            .addCase(registerAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(loginAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(loginAccount.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload.user;                            
            })
            .addCase(loginAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;            
            })
            .addCase(getuserAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getuserAccount.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload; 
            })
            .addCase(getuserAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;   
            })
            .addCase(verifyAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(verifyAccount.fulfilled, (state, { payload }) => {
                state.loading = false;         
            })
            .addCase(verifyAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;  
                alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                router.push('/client/login');            
            })
            .addCase(refreshAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(refreshAccount.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload;       
            })
            .addCase(refreshAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;                  
                alert("인증 정보가 틀립니다. 다시 로그인해주세요");
                router.push('/client/login');          
            })
    }
})
export const { resetErrors, logoutAccount } = accountsSlice.actions;