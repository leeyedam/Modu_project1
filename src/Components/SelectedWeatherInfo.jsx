import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import { useCountryStore } from "../Store/useCountryStore";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";

const theme = createTheme();

theme.typography.h1 = {
  fontSize: "3.5rem",
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
  fontSize: "1.2rem",
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
    fontSize: ".9rem",
    marginRight: "23px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

function SelectedWeatherInfo() {
  const {
    loading,
    countryName,
    countryTemp,
    countryWeather,
    countryFeelsLike,
    countryTempMin,
    countryTempMax,
  } = useCountryStore();

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          mb={2}
        >
          <Grid item xs={1} sm={1} md={10}>
            <Skeleton variant="rectangular" width={180} height={50} />
          </Grid>
          <Grid item xs={1} sm={1} md={10}>
            <Skeleton variant="rectangular" width={300} height={60} />
          </Grid>
          <Grid item xs={1} sm={1} md={10}>
            <Skeleton variant="rectangular" width={210} height={50} />
          </Grid>
          <Grid item xs={1} sm={1} md={10}>
            <Skeleton variant="rectangular" width={300} height={50} />
          </Grid>
        </Grid>
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            {countryName}
          </Typography>
          <Typography variant="h2">{countryTemp}&deg;</Typography>
          <Typography variant="h1">
            <CurrentWeatherIcon weatherState={countryWeather} />
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h6" mr={1} noWrap>
              체감
            </Typography>
            <Typography variant="h4" mr={2}>
              {countryFeelsLike}&deg;
            </Typography>
            <Typography variant="h6" mr={1} noWrap>
              최저
            </Typography>
            <Typography variant="h4" mr={2}>
              {countryTempMin}&deg;
            </Typography>
            <Typography variant="h6" mr={1} noWrap>
              최고
            </Typography>
            <Typography variant="h4">{countryTempMax}&deg;</Typography>
          </Container>
        </>
      )}
    </ThemeProvider>
  );
}

export default SelectedWeatherInfo;
