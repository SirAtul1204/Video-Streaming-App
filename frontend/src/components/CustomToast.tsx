import { RootState } from "@/redux/store";
import { closeToast } from "@/redux/toastSlice";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";

export function CustomToast() {
  const { isOpen, message, color } = useSelector(
    (state: RootState) => state.toast
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={color}>{message}</Alert>
    </Snackbar>
  );
}
