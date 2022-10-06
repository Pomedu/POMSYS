import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { lecturesReducer } from "./lectures";

const rootReducer = (state, action) => {
    switch (action.type) {
      case HYDRATE:
        return action.payload;
  
  
      default:
        return combineReducers({
            lecturesReducer: lecturesReducer.reducer
        })(state, action);
    }
  };
  
  export default rootReducer;
