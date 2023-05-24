import { ToastAction } from "@/utils/interface";
import { AlertColor } from "@mui/material/Alert";
import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  isOpen: boolean;
  message: string;
  color: AlertColor;
}

const initialToastState: ToastState = {
  isOpen: false,
  message: "message",
  color: "success",
};

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: initialToastState,
  reducers: {
    openToast(state, action: ToastAction) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.color = action.payload.color;
    },
    closeToast(state) {
      state.isOpen = false;
    },
  },
});

export const toastReducer = toastSlice.reducer;
export const { openToast, closeToast } = toastSlice.actions;
