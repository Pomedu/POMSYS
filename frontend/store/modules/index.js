import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { lecturesSlice } from "./lecturesSlice";
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
        })(state, action);
    }
  };
  
  export default rootReducer;
