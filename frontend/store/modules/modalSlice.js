import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    show: false,
    modalId: "",
};

export const modalSlice = createSlice({
    name: "modal", //이 slice의 이름 만들기
    initialState,  // 초기 값
    reducers: {
        modalOpen: (state, action) => {
            document.querySelector('body').classList.add("modal-open");
            document.querySelector('body').style.overflow = "hidden";
            document.getElementById(action.payload).style.display=("block");
            state.show = true;
        },
        modalClose: (state, action) => {
            document.querySelector('body').classList.remove("modal-open");
            document.querySelector('body').removeAttribute('style');
            document.getElementById(action.payload).style.display=("none");
            state.show = false;
        },
    },  // state 바꾸는 함수
});

export const { modalOpen, modalClose, } = modalSlice.actions;