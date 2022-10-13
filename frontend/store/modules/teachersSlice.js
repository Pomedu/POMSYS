import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTeachers = createAsyncThunk("GET/TEACHERS", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://127.0.0.1:8000/api/teachers/'
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
})

export const fetchTeacher = createAsyncThunk("GET/TEACHER", async (teacherId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createTeacher = createAsyncThunk("POST/TEACHER", async (newTeacher, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/teachers/',
        data: newTeacher,
    }).then(response => { return response })
        .catch(error => console.log(error.response.data));
})

export const deleteTeacher = createAsyncThunk("DELETE/TEACHER", async (teacherId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateTeacher = createAsyncThunk("UPDATE/TEACHER", async ({ editedTeacher, teacherId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/teachers/${teacherId}`,
        data: editedTeacher,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState= {
    teachersData: [],
    filteredTeachersData: [],
    teacherData: {},
    loading: false,
    error: null,
};

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        searchTeachers: (state, action) => {
            const namefilter = [...state.teachersData].filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
            const phonefilter = [...state.teachersData].filter(item => item.phone_number.includes(action.payload));
            const merged = namefilter.concat(phonefilter);
            state.filteredTeachersData = merged.filter((item, pos) => merged.indexOf(item) === pos);
        },
        resetTeachers: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchTeachers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.teachersData = payload;
                state.filteredTeachersData = payload;
            })
            .addCase(fetchTeachers.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createTeacher.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createTeacher.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createTeacher.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteTeacher.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteTeacher.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.teachersData = state.teachersData.filter((item) => item.id !== id);
                    state.filteredTeachersData = state.filteredTeachersData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteTeacher.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchTeacher.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchTeacher.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.teacherData = payload;
            })
            .addCase(fetchTeacher.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateTeacher.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateTeacher.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.teacherData = payload;
            })
            .addCase(updateTeacher.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})


export const { searchTeachers, resetTeachers } = teachersSlice.actions;
