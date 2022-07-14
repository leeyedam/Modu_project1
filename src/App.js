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
import { Paper } from "@mui/material";
import bg from "./img/bg1.jpg";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: blueGrey[900],
    },
  },
});

const styles = {
  paperContainer: {
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.paperContainer}>
        <AppBar position="static" color="transparent" opacity=".7">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="#fff" component="div">
              MODU
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/addWeather" element={<AddWeather />}></Route>
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
