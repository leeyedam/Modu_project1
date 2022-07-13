import React from "react";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import { useCountryStore } from "../Store/useCountryStore";
import { useEffect } from "react";

const theme = createTheme();

theme.typography.h2 = {
  fontSize: "1.4rem",

  "@media (min-width:600px)": {
    fontSize: "2rem",
    marginRight: "43px",
    "&:first-of-type": {
      marginLeft: "-5px",
    },
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
    marginRight: "36px",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

theme.typography.h4 = {
  fontSize: ".6rem",

  "@media (min-width:600px)": {
    fontSize: "1rem",
    marginRight: "42px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
    marginRight: "35px",
    "&:first-of-type": {
      marginLeft: "2px",
    },
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem",
    marginRight: "41px",
    "&:first-of-type": {
      marginLeft: "1px",
    },
  },
  "&:last-child": {
    marginRight: 0,
  },
};

theme.typography.h5 = {
  fontSize: ".65rem",

  "@media (min-width:600px)": {
    fontSize: "1rem",
    marginRight: "30px",
    "&:first-of-type": {
      marginLeft: "-2px",
    },
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
    marginRight: "26px",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

theme.typography.h6 = {
  fontSize: "1.2rem",

  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: ".9rem",
  },
};

function HourlyWeather() {
  const { hourly, getHourlyWeather } = useCountryStore();

  useEffect(() => {
    getHourlyWeather(37.5683, 126.9778);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hourly?.slice(0, 7).map((hourInfo, i) => (
            <Typography variant="h4" mr={2.5} key={i} noWrap>
              {new Date(hourInfo.dt * 1000).getHours() >= 10 ? (
                <p>{new Date(hourInfo.dt * 1000).getHours()}시</p>
              ) : (
                <p>0{new Date(hourInfo.dt * 1000).getHours()}시</p>
              )}
            </Typography>
          ))}
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hourly?.slice(0, 7).map((hourInfo, i) => (
            <Typography
              variant="h2"
              mr={2.2}
              key={i}
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CurrentWeatherIcon weatherState={hourInfo.weather[0].main} />
            </Typography>
          ))}
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hourly?.slice(0, 7).map((hourInfo, i) => (
            <Typography variant="h5" pr={0.5} mr={1.1} key={i}>
              {hourInfo.temp}
            </Typography>
          ))}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default HourlyWeather;
