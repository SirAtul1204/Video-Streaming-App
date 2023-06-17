import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme";
import { Box, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CustomToast } from "@/components/CustomToast";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            height: "100dvh",
            overflowY: "scroll",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
            <Nav />
          </Box>

          <Component {...pageProps} />

          <Box sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
            <Footer />
          </Box>
        </Box>

        <CustomToast />
      </ThemeProvider>
    </Provider>
  );
}
