import React, {Fragment} from 'react';
import '../styles/globals.css';
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/styles";
import {theme} from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import {CacheProvider} from "@emotion/react";


const clientSideEmotionCache = createEmotionCache();


function MyApp(
    {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    }
) {
    return (
        <Fragment>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <div id="drag-region"/>
                    <CssBaseline/>
                    <Component {...pageProps}/>
                 </ThemeProvider>
            </CacheProvider>
        </Fragment>
    );
}

export default MyApp;