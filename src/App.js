// import "./App.css";
import Main from "./Pages/Main";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blueGrey } from "@mui/material/colors";
import {
  experimentalStyled as styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import AddWeather from "./Pages/AddWeather";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            MODU
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/addWeather" element={<AddWeather />}></Route>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
