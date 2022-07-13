import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import Weather from "../Components/Weather";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#02427c",
    },
    secondary: {
      // This is green.A700 as hex.
      main: blueGrey[900],
    },
  },
});

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Weather />
    </ThemeProvider>
  );
}

export default Main;
