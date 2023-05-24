import { AlertColor } from "@mui/material";

export interface GenericAction {
  type: string;
}

export interface ToastAction extends GenericAction {
  payload: {
    message: string;
    color: AlertColor;
  };
}
