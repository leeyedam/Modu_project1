import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import { useCountryStore } from "../Store/useCountryStore";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
import { useEffect } from "react";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: "2.6rem",
  "@media (min-width:600px)": {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "6rem",
  },
};

theme.typography.h2 = {
  fontSize: "2.4rem",
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "5rem",
  },
};

theme.typography.h3 = {
  fontSize: "1.4rem",
  "@media (min-width:600px)": {
    fontSize: "1.7rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.h4 = {
  fontSize: ".9rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.6rem",
  },
};

theme.typography.h6 = {
  fontSize: ".8rem",

  "@media (min-width:600px)": {
    fontSize: "1.2rem",
    marginRight: "18px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.3rem",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

function WeatherInfo() {
  const {
    getWeather,
    countryName,
    countryTemp,
    countryWeather,
    countryFeelsLike,
    countryTempMin,
    countryTempMax,
  } = useCountryStore();

  useEffect(() => {
    getWeather("seoul");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">{countryName}</Typography>
      <Typography variant="h2">{countryTemp}&deg;</Typography>
      <Typography variant="h1">
        <CurrentWeatherIcon weatherState={countryWeather} />
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "42px",
        }}
      >
        <Typography variant="h6" mr={1} noWrap>
          체감
        </Typography>
        <Typography variant="h4" mr={2} noWrap>
          {countryFeelsLike}&deg;
        </Typography>
        <Typography variant="h6" mr={1} noWrap>
          최저
        </Typography>
        <Typography variant="h4" mr={2} noWrap>
          {countryTempMin}&deg;
        </Typography>
        <Typography variant="h6" mr={1} noWrap>
          최고
        </Typography>
        <Typography variant="h4">{countryTempMax}&deg;</Typography>
      </Container>
      <Box>
        <HourlyWeather />
      </Box>
    </ThemeProvider>
  );
}

export default WeatherInfo;
