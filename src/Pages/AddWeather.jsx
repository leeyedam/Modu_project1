import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddWeatherPlace from "../Components/AddWeatherPlace";

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

function AddWeather() {
  return (
    <ThemeProvider theme={theme}>
      <AddWeatherPlace />
    </ThemeProvider>
  );
}

export default AddWeather;
