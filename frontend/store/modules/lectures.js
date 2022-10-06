import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchLectures = createAsyncThunk("GET/LECTURES", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://127.0.0.1:8000/api/lectures'
    }).then(response => {return response.data})
        .catch(error => rejectWithValue(error.response.data));
})

export const lecturesReducer = createSlice({
    name: 'lectures',
    initialState: {
        lectures: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLectures.fulfilled, (state, {payload}) => {
            state.lectures = payload;
        });
        }
})
