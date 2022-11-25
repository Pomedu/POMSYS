import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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

export const logoutAccount = createAsyncThunk("LOGOUT", async (_, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/accounts/logout',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});


const initialState = {
    userData: [],
    access_token: null,
    refresh_token: null,
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
    }
})
export const { resetErrors,getAccessToken } = accountsSlice.actions;