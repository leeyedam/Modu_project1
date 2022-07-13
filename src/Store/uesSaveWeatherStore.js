import create from "zustand";

export const uesSaveWeatherStore = create((set) => ({
  weatherList: JSON.parse(localStorage.getItem("weatherList") ?? "[]"),
  selectedIndex: null,
  edit: false,
  setSelectedIndex: (idx) => {
    set({
      selectedIndex: idx,
    });
  },
  addWeatherList: (weather) => {
    set((prev) => {
      const weatherList = [...prev.weatherList, weather];
      localStorage.setItem("weatherList", JSON.stringify(weatherList));
      return {
        weatherList,
      };
    });
  },
  editWeather: (idx, weather) => {
    set(
      ({ weatherList }) => {
        weatherList[idx] = weather;
        localStorage.setItem("weatherList", JSON.stringify(weatherList));
        return {
          weatherList,
        };
      },
      {
        selectedIndex: idx,
      }
    );
  },
  clear: () => {
    set({
      weatherList: [],
    });
    localStorage.setItem("weatherList", "[]");
  },
  setEditMode: () => {
    set({
      edit: true,
      errorCountry: true,
    });
  },
  setEditModeOff: () => {
    set({
      edit: false,
    });
  },
}));
