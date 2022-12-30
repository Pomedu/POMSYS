import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";
import "moment/locale/ko";

export const fetchLectureTests = createAsyncThunk("GET/LECTURE/TEST", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/tests`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLessonTests = createAsyncThunk("GET/LESSON/TEST", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}/tests`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createTest = createAsyncThunk("CREATE/TEST ", async (newTest, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/tests/`,
        data: newTest,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteTest = createAsyncThunk("DELETE/TEST", async (testId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/tests/${testId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateTest = createAsyncThunk("UPDATE/TEST", async ({ editedTest, testId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/tests/${testId}`,
        data: editedTest,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    testsData: [],
    testData: {},
    loading: false,
    error: null,
};

export const testsSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        resetTests: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectureTests.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectureTests.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.testsData = payload;
            })
            .addCase(fetchLectureTests.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createTest.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createTest.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createTest.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteTest.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.testsData = state.testsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteTest.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLessonTests.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessonTests.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.testsData = payload;
            })
            .addCase(fetchLessonTests.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateTest.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateTest.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.testData = payload;
            })
            .addCase(updateTest.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { resetTests } = testsSlice.actions;