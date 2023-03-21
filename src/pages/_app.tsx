import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/auth";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import { ProjectProvider } from "@/context/project";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  GetLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const GetLayout = Component.GetLayout ?? ((page) => page);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProjectProvider>
            {GetLayout(<Component {...pageProps} />)}
        </ProjectProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
