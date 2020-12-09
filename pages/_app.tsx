import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import App from "next/app";
import Head from "next/head";
import React from "react";

import MenuAppBar from "../components/MenuAppBar";
import theme from "../themes/theme";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>AJ' Books</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MenuAppBar />
          <Grid container direction="row" justify="center" alignItems="center">
            <Component {...pageProps} />
          </Grid>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
