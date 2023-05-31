import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useRouteError } from "react-router-dom";

const primary = purple[500]; // #f44336

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
    <CssBaseline/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: primary,
        }}
      >
        <Typography variant="h6" style={{ color: "white" }}>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          {error.statusText || error.message}
        </Typography>
      </Box>
    </>
  );
}
