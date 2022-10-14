import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { enrollsSlice } from "./enrollsSlice";
import { lecturesSlice } from "./lecturesSlice";
import { lessonsSlice } from "./lessonsSlice";
import { modalSlice } from "./modalSlice";
import { studentsSlice } from "./studentsSlice";
import { teachersSlice } from "./teachersSlice";

const rootReducer = (state, action) => {
    switch (action.type) {
      case HYDRATE:
        return {...state,...action.payload};
      default:
        return combineReducers({
            lectures: lecturesSlice.reducer,
            teachers: teachersSlice.reducer,
            students: studentsSlice.reducer,
            enrolls: enrollsSlice.reducer,
            lessons: lessonsSlice.reducer,
            modal: modalSlice.reducer,
        })(state, action);
    }
  };
  
  export default rootReducer;
