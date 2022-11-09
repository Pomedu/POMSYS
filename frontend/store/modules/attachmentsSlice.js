import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";

export const fetchLectureAttachments = createAsyncThunk("GET/LECTURE/ATTACHMENT", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/attachments`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLessonAttachments = createAsyncThunk("GET/LESSON/ATTACHMENT", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}/attachments`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createAttachment = createAsyncThunk("CREATE/ATTACHMENT ", async (newAttachment, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/attachments/`,
        data: newAttachment,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteAttachment = createAsyncThunk("DELETE/ATTACHMENT", async (attachmentId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/attachments/${attachmentId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    attachmentsData: [],
    attachmentData: {},
    loading: false,
    error: null,
};

export const attachmentsSlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
        resetAttachments: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectureAttachments.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectureAttachments.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attachmentsData = payload;
            })
            .addCase(fetchLectureAttachments.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createAttachment.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createAttachment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attachmentData = payload;
                console.log(payload);
            })
            .addCase(createAttachment.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteAttachment.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteAttachment.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.attachmentsData = state.attachmentsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteAttachment.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLessonAttachments.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessonAttachments.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.attachmentsData = payload;
            })
            .addCase(fetchLessonAttachments.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
    }
})

export const { resetAttachments } = attachmentsSlice.actions;