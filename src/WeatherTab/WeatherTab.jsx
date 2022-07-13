import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HumidityGraph from "../Graph/HumidityGraph";
import WindGraph from "../Graph/WindGraph";
import WeatherGraph from "../Graph/WeatherGraph";
import { useState } from "react";
import { useCountryStore } from "../Store/useCountryStore";
import { Grid, Skeleton } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WeatherTab() {
  const [value, setValue] = useState(0);
  const { loading } = useCountryStore();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        ".css-1ujykiq-MuiButtonBase-root-MuiTab-root.Mui-selected": {
          color: "#fff",
        },
        ".css-1ujykiq-MuiButtonBase-root-MuiTab-root": {
          color: "#fff",
        },
        ".css-1aquho2-MuiTabs-indicator": {
          backgroundColor: "#fff",
        },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "#fff" }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="날씨" {...a11yProps(0)} />
          <Tab label="습도" {...a11yProps(1)} />
          <Tab label="바람" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {loading ? (
          <>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              mt={2}
            >
              <Grid item xs={1} sm={1} md={10}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
            </Grid>
          </>
        ) : (
          <WeatherGraph />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              mt={2}
            >
              <Grid item xs={1} sm={1} md={10}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
            </Grid>
          </>
        ) : (
          <HumidityGraph />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {loading ? (
          <>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              mt={2}
            >
              <Grid item xs={1} sm={1} md={10}>
                <Skeleton variant="rectangular" height={400} />
              </Grid>
            </Grid>
          </>
        ) : (
          <WindGraph />
        )}
      </TabPanel>
    </Box>
  );
}
