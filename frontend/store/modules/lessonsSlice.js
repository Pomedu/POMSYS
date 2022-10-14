import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchLessons = createAsyncThunk("GET/LECTURES", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://127.0.0.1:8000/api/lessons/'
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLesson = createAsyncThunk("GET/LECTURE", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lessons/${lessonId}`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchTeacherLessons = createAsyncThunk("GET/TEACHER/LECTURE", async (teacherId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}/lessons`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createLesson = createAsyncThunk("POST/LECTURE", async (newLesson, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/lessons/',
        data: newLesson,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteLesson = createAsyncThunk("DELETE/LECTURE", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lessons/${lessonId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateLesson = createAsyncThunk("UPDATE/LECTURE", async ({ editedLesson, lessonId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lessons/${lessonId}`,
        data: editedLesson,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    lessonsData: [],
    filteredLessonsData: [],
    lessonData: {},
    loading: false,
    error: null,
};

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        searchLessons: (state, action) => {
            const namefilter = [...state.lessonsData].filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
            const teacherfilter = [...state.lessonsData].filter(item => item.teacher.toLowerCase().includes(action.payload.toLowerCase()));
            const merged = namefilter.concat(teacherfilter);
            state.filteredLessonsData = merged.filter((item, pos) => merged.indexOf(item) === pos);
        },
        resetLessons: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessons.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lessonsData = payload;
                state.filteredLessonsData = payload;
            })
            .addCase(fetchLessons.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createLesson.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createLesson.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createLesson.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteLesson.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteLesson.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.lessonsData = state.lessonsData.filter((item) => item.id !== id);
                    state.filteredLessonsData = state.filteredLessonsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteLesson.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLesson.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLesson.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lessonData = payload;
            })
            .addCase(fetchLesson.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateLesson.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateLesson.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lessonData = payload;
            })
            .addCase(updateLesson.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchTeacherLessons.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchTeacherLessons.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lessonsData = payload;
                state.filteredLessonsData = payload;
            })
            .addCase(fetchTeacherLessons.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { searchLessons, resetLessons } = lessonsSlice.actions;