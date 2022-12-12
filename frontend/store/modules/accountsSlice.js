import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";

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

export const refreshAccount = createAsyncThunk("REFRESH", async (refreshToken, { rejectWithValue })=>{
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/token/refresh/',
        data: refreshToken
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const verifyAccount = createAsyncThunk("VERIFY", async ({accessToken, refreshToken}, { rejectWithValue })=>{
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/token/verify/',
        data: accessToken
    }).then(response => { return response.data })
        .catch(error => { 
            console.log(error);
        });
});



const initialState = {
    userData: [],
    isAccess: false,
    isRefresh: false,
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
        getAccessToken: (state) =>{            
            state.access_token=localStorage.getItem('access_token')
            ? localStorage.getItem('access_token')
            : null
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
                state.userData = payload;                
            })
            .addCase(loginAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;            
            })
            .addCase(verifyAccount.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(verifyAccount.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userData = payload;                
            })
            .addCase(verifyAccount.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;            
            })
    }
})
export const { resetErrors,getAccessToken } = accountsSlice.actions;