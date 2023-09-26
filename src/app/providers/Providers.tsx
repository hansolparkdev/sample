'use client'
import { IntlProvider } from 'react-intl';
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot } from 'recoil';
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

const Providers = ({ 
        messages, 
        locale, 
        children 
    }:{ 
        messages: any, 
        locale: any, 
        children: React.ReactNode
    } ) => {
    console.log(messages)
    console.log(locale)
    return (
        <IntlProvider messages={messages} locale={locale}>
            <RecoilRoot>
                <ThemeProvider theme={baselightTheme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </RecoilRoot>
        </IntlProvider>
    )
}
export default Providers