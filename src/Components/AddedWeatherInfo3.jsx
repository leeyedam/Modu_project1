import { Box, Paper, Typography } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { uesSaveWeatherStore } from "../Store/uesSaveWeatherStore";
import { useCountryStore } from "../Store/useCountryStore";
import { useCountryStore3 } from "../Store/useCountryStore3";

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: "white",
  borderRadius: 20,
}));

const AddedItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  paddingTop: theme.spacing(4.5),
  paddingBottom: theme.spacing(5.8),
  textAlign: "center",
  color: "white",
  borderRadius: 20,
}));

theme.typography.h2 = {
  fontSize: "1.6rem",
  "@media (min-width:600px)": {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
};

theme.typography.h3 = {
  fontSize: "1.6rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.6rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.3rem",
  "@media (min-width:600px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.2rem",
  },
};

theme.typography.h5 = {
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1.rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
};

theme.typography.h6 = {
  fontSize: ".8rem",
  "@media (min-width:600px)": {
    fontSize: "1.rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
  },
};

function AddedWeatherInfo3(i) {
  const navigete = useNavigate();

  const {
    getWeather,
    countryName,
    countryTemp,
    countryWeather,
    countryFeelsLike,
    countryTempMin,
    countryTempMax,
  } = useCountryStore3();

  const { setClearHourly } = useCountryStore();

  const { weatherList, setEditMode, setEditModeOff, setSelectedIndex } =
    uesSaveWeatherStore();

  const addedCountryName = weatherList[2]?.countryName;

  useEffect(() => {
    if (!weatherList[2]) return;
    getWeather(addedCountryName);
  }, []);

  function handleClick() {
    setEditMode();
    setSelectedIndex(2);
    navigete("/addWeather");
  }

  return (
    <ThemeProvider theme={theme}>
      {weatherList[2] ? (
        <>
          <AddedItem
            elevation={6}
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Box
              sx={{ display: "flex" }}
              justifyContent="center"
              alignItems="center"
              mb={0.6}
            >
              <Typography
                variant="h3"
                component="div"
                mr={3}
                sx={{ fontWeight: 700 }}
              >
                {countryName}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                mr={2}
                sx={{ fontWeight: 600 }}
              >
                {countryTemp}&deg;
              </Typography>
              <Typography variant="h4" component="div" mr={2}>
                |
              </Typography>
              <Typography
                variant="h2"
                component="div"
                alignItems="center"
                sx={{ display: "flex" }}
              >
                <CurrentWeatherIcon weatherState={countryWeather} />
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex" }}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" mr={1.5} noWrap>
                체감
              </Typography>
              <Typography
                variant="h5"
                component="div"
                mr={2}
                sx={{ fontWeight: 600 }}
              >
                {countryFeelsLike}&deg;
              </Typography>
              <Typography variant="h6" mr={1.5} noWrap>
                최저
              </Typography>
              <Typography
                variant="h5"
                component="div"
                mr={2}
                sx={{ fontWeight: 600 }}
              >
                {countryTempMin}&deg;
              </Typography>
              <Typography variant="h6" mr={1.5} noWrap>
                최고
              </Typography>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {countryTempMax}&deg;
              </Typography>
            </Box>
          </AddedItem>
        </>
      ) : (
        <Item
          elevation={6}
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => {
            navigete("/addWeather");
            setEditModeOff();
            setClearHourly();
          }}
        >
          추가하기 +
        </Item>
      )}
    </ThemeProvider>
  );
}

export default AddedWeatherInfo3;
