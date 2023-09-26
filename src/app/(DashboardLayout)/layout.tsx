
// import { styled, Container, Box } from "@mui/material";
import React from "react";
import LayoutWraper from './LayoutWraper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWraper>
      {children}
    </LayoutWraper>
  );
}
