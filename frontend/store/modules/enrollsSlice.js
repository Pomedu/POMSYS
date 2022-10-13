import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchEnrolls = createAsyncThunk("GET/ENROLLS", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/enrolls`
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createEnroll = createAsyncThunk("POST/ENROLL", async (newEnroll, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/lectures/enrolls/',
        data: newEnroll,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteEnroll = createAsyncThunk("DELETE/ENROLL", async (enrollId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/enrolls/${enrollId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const  initialState = {
    enrollsData: [],
    filteredEnrollsData: [],
    loading: false,
    error: null,
};

export const enrollsSlice = createSlice({
    name: 'enrolls',
    initialState,
    reducers: {
        searchEnrolls: (state, action) => {
            const studentfilter = [...state.enrollsData].filter(item => item.student.name.toLowerCase().includes(action.payload.toLowerCase()));
            const lecturefilter = [...state.enrollsData].filter(item => item.lecture.name.toLowerCase().includes(action.payload.toLowerCase()));
            const merged = studentfilter.concat(lecturefilter);
            state.filteredEnrollsData = merged.filter((item, pos) => merged.indexOf(item) === pos);
        },
        resetEnrolls: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnrolls.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchEnrolls.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.enrollsData = payload;
                state.filteredEnrollsData = payload;
            })
            .addCase(fetchEnrolls.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createEnroll.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createEnroll.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createEnroll.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteEnroll.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteEnroll.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.enrollsData = state.enrollsData.filter((item) => item.id !== id);
                    state.filteredEnrollsData = state.filteredEnrollsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteEnroll.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { searchEnrolls, resetEnrolls } = enrollsSlice.actions;