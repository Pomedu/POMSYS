import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";

export const fetchLectureAttendances = createAsyncThunk("GET/LECTURE/ATTENDANCE", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/attendances`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLessonAttendances = createAsyncThunk("GET/LESSON/ATTENDANCE", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}/attendances`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createAttendance = createAsyncThunk("CREATE/ATTENDANCE ", async (newAttendance, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/attendances/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
        data: newAttendance,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteAttendance = createAsyncThunk("DELETE/ATTENDANCE", async (attendanceId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/attendances/${attendanceId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateAttendance = createAsyncThunk("UPDATE/ATTENDANCE", async ({ editedAttendance, attendanceId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/attendances/${attendanceId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          },
        data: editedAttendance,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    attendancesData: [],
    attendanceData: {},
    loading: false,
    error: null,
};

export const attendancesSlice = createSlice({
    name: 'attendances',
    initialState,
    reducers: {
        resetAttendances: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectureAttendances.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectureAttendances.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attendancesData = payload;
            })
            .addCase(fetchLectureAttendances.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createAttendance.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createAttendance.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attendanceData = payload;
                console.log(payload);
            })
            .addCase(createAttendance.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteAttendance.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteAttendance.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.attendancesData = state.attendancesData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteAttendance.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLessonAttendances.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessonAttendances.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attendancesData = payload;
            })
            .addCase(fetchLessonAttendances.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateAttendance.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateAttendance.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attendanceData = payload;
            })
            .addCase(updateAttendance.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { resetAttendances } = attendancesSlice.actions;