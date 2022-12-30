import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from "moment";
import "moment/locale/ko";

export const fetchLectureVideos = createAsyncThunk("GET/LECTURE/VIDEO", async (lectureId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/${lectureId}/videos`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchLessonVideos = createAsyncThunk("GET/LESSON/VIDEO", async (lessonId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/lectures/lessons/${lessonId}/videos`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createVideo = createAsyncThunk("CREATE/VIDEO ", async (newVideo, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/lectures/videos/`,
        data: newVideo,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteVideo = createAsyncThunk("DELETE/VIDEO", async (videoId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/lectures/videos/${videoId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateVideo = createAsyncThunk("UPDATE/VIDEO", async ({ editedVideo, videoId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/lectures/videos/${videoId}`,
        data: editedVideo,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    videosData: [],
    videoData: {},
    loading: false,
    error: null,
};

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        resetVideos: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLectureVideos.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLectureVideos.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.videosData = payload;
            })
            .addCase(fetchLectureVideos.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createVideo.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createVideo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.videoData = payload;
            })
            .addCase(createVideo.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteVideo.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.videosData = state.videosData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteVideo.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchLessonVideos.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchLessonVideos.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.videosData = payload;
            })
            .addCase(fetchLessonVideos.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateVideo.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateVideo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.videoData = payload;
            })
            .addCase(updateVideo.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { resetVideos } = videosSlice.actions;