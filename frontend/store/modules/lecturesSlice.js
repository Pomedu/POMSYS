import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const fetchLectures = createAsyncThunk("GET/LECTURES", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://127.0.0.1:8000/api/lectures/',
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLecture = createAsyncThunk("GET/LECTURE", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}`,
    }).then(response => { return response.data })
        .catch(error => {rejectWithValue(error.response.data);
            });
});

export const fetchTeacherLectures = createAsyncThunk("GET/TEACHER/LECTURE", async (teacherId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}/lectures`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchStudentLectures = createAsyncThunk("GET/STUDENT/LECTURE", async (studentId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/students/${studentId}/lectures`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createLecture = createAsyncThunk("POST/LECTURE", async (newLecture, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/lectures/',
        data: newLecture,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteLecture = createAsyncThunk("DELETE/LECTURE", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateLecture = createAsyncThunk("UPDATE/LECTURE", async ({ editedLecture, lectureId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}`,
        data: editedLecture,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    lecturesData: [],
    filteredLecturesData: [],
    lectureData: {},
    loading: false,
    error: null,
};

export const lecturesSlice = createSlice({
    name: 'lectures',
    initialState,
    reducers: {
        searchLectures: (state, action) => {
            const namefilter = [...state.lecturesData].filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
            const teacherfilter = [...state.lecturesData].filter(item => item.teacher.toLowerCase().includes(action.payload.toLowerCase()));
            const merged = namefilter.concat(teacherfilter);
            state.filteredLecturesData = merged.filter((item, pos) => merged.indexOf(item) === pos);
        },
        resetLectures: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectures.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectures.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lecturesData = payload;
                state.filteredLecturesData = payload;
            })
            .addCase(fetchLectures.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createLecture.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createLecture.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createLecture.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteLecture.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteLecture.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.lecturesData = state.lecturesData.filter((item) => item.id !== id);
                    state.filteredLecturesData = state.filteredLecturesData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteLecture.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLecture.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLecture.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lectureData = payload;
            })
            .addCase(fetchLecture.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateLecture.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateLecture.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lectureData = payload;
            })
            .addCase(updateLecture.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchTeacherLectures.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchTeacherLectures.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lecturesData = payload;
                state.filteredLecturesData = payload;
            })
            .addCase(fetchTeacherLectures.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchStudentLectures.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchStudentLectures.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lecturesData = payload;
                state.filteredLecturesData = payload;
            })
            .addCase(fetchStudentLectures.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { searchLectures, resetLectures } = lecturesSlice.actions;