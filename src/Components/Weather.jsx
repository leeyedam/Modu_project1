import { Fab, Grid } from "@mui/material";
import {
  experimentalStyled as styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import React from "react";
import WeatherInfo from "./WeatherInfo";
import { useNavigate } from "react-router-dom";
import { uesSaveWeatherStore } from "../Store/uesSaveWeatherStore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddedWeatherInfo1 from "./AddedWeatherInfo1";
import AddedWeatherInfo2 from "./AddedWeatherInfo2";
import AddedWeatherInfo3 from "./AddedWeatherInfo3";
import AddedWeatherInfo4 from "./AddedWeatherInfo4";

const theme = createTheme();

const ItemMain = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(21),
  textAlign: "center",
  color: "white",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: "white",
}));

function Weather() {
  const navigete = useNavigate();

  const { weatherList, clear } = uesSaveWeatherStore();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{ marginTop: "30px" }}
          pb={3}
        >
          <Grid container item xs={10} sm={10} lg={4}>
            <Grid item xs={12} sm={12} md={12}>
              <ItemMain elevation={6}>
                <WeatherInfo />
              </ItemMain>
            </Grid>
          </Grid>
          <Grid container item xs={10} sm={10} lg={6} spacing={2.1} mb={7}>
            {weatherList.length ? (
              <>
                <Grid item xs={12} sm={12} md={12}>
                  <AddedWeatherInfo1 />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <AddedWeatherInfo2 />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <AddedWeatherInfo3 />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <AddedWeatherInfo4 />
                </Grid>
              </>
            ) : (
              Array.from(Array(4 - weatherList.length)).map((_, index) => (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <Item
                    elevation={6}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => {
                      navigete("/addWeather");
                    }}
                  >
                    추가하기 +
                  </Item>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => {
            clear();
            alert("모두 삭제되었습니다.");
            window.location.reload();
          }}
        >
          <DeleteIcon />
        </Fab>
      </ThemeProvider>
    </div>
  );
}

export default Weather;
