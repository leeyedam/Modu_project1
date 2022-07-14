import { Fab, Grid } from "@mui/material";
import {
  experimentalStyled as styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import React, { useEffect } from "react";
import SelectCountry from "../SelectCountry/SelectCountry";
import WeatherTab from "../WeatherTab/WeatherTab";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useCountryStore } from "../Store/useCountryStore";
import { uesSaveWeatherStore } from "../Store/uesSaveWeatherStore";

const theme = createTheme();

const ItemMain = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(24),
  textAlign: "center",
  color: "white",
}));

function AddWeatherPlace() {
  const navigate = useNavigate();
  const {
    countryName,
    countryTemp,
    countryWeather,
    countryFeelsLike,
    countryTempMin,
    countryTempMax,
    setClearHourly,
    lat,
    lon,
    setCancelError,
  } = useCountryStore();
  const { selectedIndex, editWeather, addWeatherList, edit, setSelectedIndex } =
    uesSaveWeatherStore();

  useEffect(() => {
    setClearHourly();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(10),
          right: (theme) => theme.spacing(2),
        }}
        onClick={() => {
          const info = {
            countryName,
            countryTemp,
            countryWeather,
            countryFeelsLike,
            countryTempMin,
            countryTempMax,
            lat,
            lon,
          };
          if (!edit && !countryName) {
            alert("나라와 수도를 선택해 주세요");
            return;
          } else if (Number.isInteger(selectedIndex)) {
            editWeather(selectedIndex, info);
          } else {
            addWeatherList(info);
          }
          alert("저장되었습니다.");
          setSelectedIndex(null);
          navigate("/");
          setClearHourly();
        }}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="#fff"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={() => {
          setSelectedIndex(null);
          navigate("/");
          setClearHourly();
          setCancelError();
        }}
      >
        <KeyboardBackspaceIcon />
      </Fab>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        sx={{ marginTop: "60px" }}
        pb={12}
      >
        <Grid container item xs={10} sm={10} md={7}>
          <Grid item xs={12} sm={12} md={12}>
            <ItemMain elevation={6}>
              <SelectCountry />
              <WeatherTab />
            </ItemMain>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AddWeatherPlace;
