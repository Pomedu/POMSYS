import { combineReducers } from "@reduxjs/toolkit";
import { lecturesReducer } from "./lectures";

const rootReducer = combineReducers({
    lecturesReducer: lecturesReducer.reducer
    // 여기에 추가
});


export default rootReducer;