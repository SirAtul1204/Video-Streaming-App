import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CustomToast } from "@/components/CustomToast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <CustomToast />
      </ThemeProvider>
    </Provider>
  );
}
