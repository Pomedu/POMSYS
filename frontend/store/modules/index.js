import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { attachmentsSlice } from "./attachmentsSlice";
import { attendancesSlice } from "./attendancesSlice";
import { enrollsSlice } from "./enrollsSlice";
import { lecturesSlice } from "./lecturesSlice";
import { lessonsSlice } from "./lessonsSlice";
import { modalSlice } from "./modalSlice";
import { studentsSlice } from "./studentsSlice";
import { teachersSlice } from "./teachersSlice";
import { testsSlice } from "./testsSlice";
import { videosSlice } from "./videosSlice";

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
            attendances: attendancesSlice.reducer,
            attachments: attachmentsSlice.reducer,
            videos: videosSlice.reducer,
            tests: testsSlice.reducer,
            modal: modalSlice.reducer,
        })(state, action);
    }
  };
  
  export default rootReducer;
