import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";

export const fetchLessons = createAsyncThunk("GET/LESSONS", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLectureLessons = createAsyncThunk("GET/LECTURE/LESSON", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/lessons`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLesson = createAsyncThunk("GET/LESSON", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createLesson = createAsyncThunk("CREATE/LESSON", async (_, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/lessons/`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteLesson = createAsyncThunk("DELETE/LESSON", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateLesson = createAsyncThunk("UPDATE/LESSON", async ({ editedLesson, lessonId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}`,
        data: editedLesson,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const fetchTeacherLessons = createAsyncThunk("GET/TEACHER/LESSON", async (teacherId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}/lessons`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

const initialState = {
    lessonsData: [],
    upcomingLessonsData: [],
    completedLessonsData: [],
    lessonData: {},
    loading: false,
    error: null,
};

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
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
                state.upcomingLessonsData = payload.filter((item)=>item.done == false);
                state.completedLessonsData = payload.filter((item)=>item.done == true);
            })
            .addCase(fetchLessons.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLectureLessons.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectureLessons.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.lessonsData = payload;
                state.upcomingLessonsData = payload.filter((item)=>item.done == false);
                state.completedLessonsData = payload.filter((item)=>item.done == true);
            })
            .addCase(fetchLectureLessons.rejected, (state, { payload }) => {
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
                    state.upcomingLessonsData = state.upcomingLessonsData.filter((item) => item.id !== id);
                    state.completedLessonsData = state.completedLessonsData.filter((item) => item.id !== id);
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
                state.upcomingLessonsData = payload.filter((item)=>item.done == false);
                state.completedLessonsData = payload.filter((item)=>item.done == true);
            })
            .addCase(fetchTeacherLessons.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { resetLessons } = lessonsSlice.actions;