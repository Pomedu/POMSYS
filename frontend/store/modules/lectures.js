import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchLectures = createAsyncThunk("GET/LECTURES", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://localhost:8000/api/lectures'
    }).then(response => {return response.data})
        .catch(error => rejectWithValue(error.response.data));
})

export const lecturesReducer = createSlice({
    name: 'lectures',
    initialState: {
        loading: false,
        error: null,
        lectures: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLectures.pending, (state, {payload}) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(fetchLectures.fulfilled, (state, {payload}) => {
            state.error = null;
            state.loading = false;
            state.lectures = payload;
        })
        .addCase(fetchLectures.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
        }
})
