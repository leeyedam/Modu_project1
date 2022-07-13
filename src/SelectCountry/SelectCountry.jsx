import React, { useEffect } from "react";
import { countries } from "countries-list";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { useCountryStore } from "../Store/useCountryStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SelectedWeatherInfo from "../Components/SelectedWeatherInfo";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import { uesSaveWeatherStore } from "../Store/uesSaveWeatherStore";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#fff",
    },
  },
});

const useStyles = makeStyles({
  select: {
    "&:before": {
      borderBottom: "2px solid rgba(255, 255, 255, 1) !important",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(255, 255, 255, 1)",
    },
    color: "#fff !important",
  },
  label: {
    color: "#fff !important",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const contries = countries;

const countryArr = Object.keys(contries);

const names = countryArr.map((array) => {
  return `${contries[array].name} / ${contries[array].capital}`;
});

function getStyles(name, countryName, mainTheme) {
  return {
    fontWeight:
      countryName.indexOf(name) === -1
        ? mainTheme.typography.fontWeightRegular
        : mainTheme.typography.fontWeightMedium,
    color: theme.secondary,
  };
}

function SelectCountry() {
  const mainTheme = useTheme();
  const [countryName, setCountryName] = useState("");
  const [click, setClick] = useState(false);
  const {
    getWeather,
    lat,
    lon,
    getHourlyWeather,
    errorCountry,
    setCancelError,
  } = useCountryStore();
  const { setEditModeOff, edit, weatherList, selectedIndex } =
    uesSaveWeatherStore();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setCountryName(
      // On autofill we get a stringified value.
      // typeof value === "string" ? value.split(",") : value
      value
    );
  };

  const buttonClick = () => {
    if (!countryName) return;
    setClick(true);
    getWeather(countryName.split("/")[1]);
  };

  useEffect(() => {
    if (!countryName || !click) return;
    getHourlyWeather(lat, lon);
    setEditModeOff();
    setCancelError();
  }, [getWeather, lat, lon]);

  useEffect(() => {
    if (edit) {
      getWeather(weatherList[selectedIndex].countryName);
      getHourlyWeather(
        weatherList[selectedIndex].lat,
        weatherList[selectedIndex].lon
      );
    }
  }, []);

  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          sx={{ marginTop: "30px" }}
          pb={3}
        >
          <Grid container item xs={8} sm={4} md={5} lg={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
            <FormControl
              variant="standard"
              sx={{
                mb: 2,
                width: 250,
              }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                color="secondary"
                className={classes.label}
              >
                Country
              </InputLabel>
              <Select
                inputProps={{
                  classes: {
                    icon: classes.icon,
                    root: classes.root,
                  },
                }}
                className={classes.select}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={countryName}
                onChange={handleChange}
                MenuProps={MenuProps}
                color="secondary"
                sx={{
                  ".css-yf8vq0-MuiSelect-nativeInput": {
                    borderBottom: "1px solid #fff",
                  },
                  ".MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, countryName, mainTheme)}
                    onChange={handleChange}
                    label={name}
                  >
                    {name}
                  </MenuItem>
                ))}
                å
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={1} sm={1} md={2} lg={0.5}>
            <Grid item xs={12} sm={8} md={12} lg={12}>
              <Button variant="text" size="large" onClick={buttonClick} pl={2}>
                <SearchIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {click ? <SelectedWeatherInfo /> : <></>}
        {edit && !errorCountry ? <SelectedWeatherInfo /> : <></>}
      </ThemeProvider>
    </>
  );
}

export default SelectCountry;
