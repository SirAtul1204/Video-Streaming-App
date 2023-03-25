import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#63e6ff",
    },
    secondary: {
      main: "#c779f9",
    },
  },
};

export const theme = createTheme(themeOptions);
