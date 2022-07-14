import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Core modules imports are same as usual
import { Navigation } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";
import { useCountryStore } from "../Store/useCountryStore";
import "swiper/css";
import "swiper/css/navigation";
import { Grid, Slider, Stack, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#fff",
    },
  },
});

theme.typography.h4 = {
  fontSize: ".8rem",

  "@media (min-width:600px)": {
    fontSize: ".9rem",
    marginRight: "22px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
    marginRight: "38px",
    "&:first-of-type": {
      // marginLeft: "17px",
    },
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.2rem",
    marginRight: "42px",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

theme.typography.h5 = {
  fontSize: ".8rem",

  "@media (min-width:600px)": {
    fontSize: ".9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem",
    // marginRight: "30px",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

function valuetext(value) {
  return `${value}°C`;
}

function LineGraph({ num }) {
  const { hourly } = useCountryStore();

  return (
    <ThemeProvider theme={theme}>
      {hourly ? (
        <Stack
          sx={{ height: 250 }}
          spacing={5}
          direction="row"
          mt={7}
          justifyContent="center"
          mb={12}
        >
          <Grid
            container
            direction="row"
            spacing={{ xs: 1, sm: 1, md: 1 }}
            columns={{ xs: 8, sm: 12, md: 12 }}
            justifyContent="center"
          >
            {hourly?.slice(num * 8, (num + 1) * 8).map(({ dt, temp }) => (
              <Grid item xs={1} sm={1} md={1} key={dt}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "100" }}
                  gutterBottom
                >
                  {Math.floor(temp)}&deg;
                </Typography>
                <Slider
                  getAriaLabel={() => "Temperature"}
                  orientation="vertical"
                  getAriaValueText={valuetext}
                  defaultValue={temp}
                  valueLabelDisplay="auto"
                  color="primary"
                  aria-label="Disabled slider"
                />
                <Typography variant="h4" noWrap>
                  {new Date(dt * 1000).getHours() >= 10 ? (
                    <p>{new Date(dt * 1000).getHours()}시</p>
                  ) : (
                    <p>0{new Date(dt * 1000).getHours()}시</p>
                  )}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
}

function WeatherGraph() {
  const slides = [];

  for (let i = 0; i < 3; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <LineGraph num={i} />
      </SwiperSlide>
    );
  }

  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  );
}

export default WeatherGraph;
