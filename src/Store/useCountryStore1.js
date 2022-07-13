import create from "zustand";
import axios from "axios";

export const useCountryStore1 = create((set) => ({
  country: "",
  loading: false,
  countryName: "",
  countryTemp: "",
  countryFeelsLike: "",
  countryTempMin: "",
  countryTempMax: "",
  countryWeather: {},
  lat: "",
  lon: "",
  hourly: [],
  hourlyRes: "",
  emoji: "",

  getWeather: async (city) => {
    set({
      loading: true,
    });
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=723f77003830970ec9177664e572a15d&q=${city}&units=metric`
      );
      set((state) => ({
        countryName: res.data.name,
        countryTemp: res.data.main.temp,
        countryFeelsLike: res.data.main.feels_like,
        countryTempMin: res.data.main.temp_min,
        countryTempMax: res.data.main.temp_max,
        countryWeather: res.data.weather[0].main,
        lat: res.data.coord.lat,
        lon: res.data.coord.lon,
        loading: false,
        country: city,
      }));
    } catch (error) {
      console.error(error);
      if ((error.message = "city not found")) {
        alert("city not found (업데이트되지 않은 도시입니다.)");
      }
      set({ loading: false });
    }
  },
  getHourlyWeather: async (lat, lon) => {
    set({
      loading: true,
    });
    try {
      const hourlyRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&appid=723f77003830970ec9177664e572a15d&units=metric`
      );
      set({
        hourly: hourlyRes.data.hourly,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  setClearHourly: () => {
    set({
      hourly: null,
    });
  },
}));
