import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";
import "moment/locale/ko";

export const fetchQuestion = createAsyncThunk("GET/QUESTION", async (questionId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/questions/${questionId}`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLessonQuestions = createAsyncThunk("GET/LESSON/QUESTION", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}/questions`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchStudentQuestions = createAsyncThunk("GET/STUDENT/QUESTION", async (studentId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/students/${studentId}/questions`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createQuestion = createAsyncThunk("CREATE/QUESTION ", async (newQuestion, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/questions/`,
        data: newQuestion,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteQuestion = createAsyncThunk("DELETE/QUESTION", async (questionId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/questions/${questionId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateQuestion = createAsyncThunk("UPDATE/QUESTION", async ({ answer, questionId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/questions/${questionId}`,
        data: answer,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    questionsData: [],
    questionData: {},
    loading: false,
    error: null,
};

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        resetQuestions: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestion.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchQuestion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questionData = payload;
            })
            .addCase(fetchQuestion.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createQuestion.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createQuestion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questionData = payload;
                console.log(payload);
            })
            .addCase(createQuestion.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.questionsData = state.questionsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteQuestion.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLessonQuestions.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessonQuestions.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questionsData = payload;
            })
            .addCase(fetchLessonQuestions.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchStudentQuestions.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchStudentQuestions.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questionsData = payload;
            })
            .addCase(fetchStudentQuestions.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateQuestion.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateQuestion.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.questionData = payload;
            })
            .addCase(updateQuestion.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { resetQuestions } = questionsSlice.actions;