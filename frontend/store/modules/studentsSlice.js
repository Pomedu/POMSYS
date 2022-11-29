import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchStudents = createAsyncThunk("GET/STUDENTS", async (_, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: 'http://127.0.0.1:8000/api/students/',
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const fetchStudent = createAsyncThunk("GET/STUDENT", async (studentId, { rejectWithValue }) => {
    return axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/students/${studentId}`,
    }).then(response => { return response.data })
        .catch(error => rejectWithValue(error.response.data));
});

export const createStudent = createAsyncThunk("POST/STUDENT", async (newStudent, { rejectWithValue }) => {
    return axios({
        method: "post",
        url: 'http://127.0.0.1:8000/api/students/',
        data: newStudent,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const deleteStudent = createAsyncThunk("DELETE/STUDENT", async (studentId, { rejectWithValue }) => {
    return axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/students/${studentId}`,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

export const updateStudent = createAsyncThunk("UPDATE/STUDENT", async ({ editedStudent, studentId }, { rejectWithValue }) => {
    return axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/students/${studentId}`,
        data: editedStudent,
    }).then(response => { return response.data })
        .catch(error => console.log(error.response.data));
});

const initialState = {
    studentsData: [],
    filteredStudentsData: [],
    studentData: {},
    loading: false,
    error: null,
};

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        searchStudents: (state, action) => {
            const namefilter = [...state.studentsData].filter(item => item.name.toLowerCase().includes(action.payload.toLowerCase()));
            const phonefilter = [...state.studentsData].filter(item => item.phone_number.includes(action.payload));
            const merged = namefilter.concat(phonefilter);
            state.filteredStudentsData = merged.filter((item, pos) => merged.indexOf(item) === pos);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.studentsData = payload;
                state.filteredStudentsData = payload;
            })
            .addCase(fetchStudents.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(createStudent.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(createStudent.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createStudent.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(deleteStudent.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.meta.arg;
                if (id) {
                    state.studentsData = state.studentsData.filter((item) => item.id !== id);
                    state.filteredStudentsData = state.filteredStudentsData.filter((item) => item.id !== id);
                }
            })
            .addCase(deleteStudent.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchStudent.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchStudent.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.studentData = payload;
            })
            .addCase(fetchStudent.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(updateStudent.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateStudent.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.studentData = payload;
            })
            .addCase(updateStudent.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})

export const { searchStudents } = studentsSlice.actions;
