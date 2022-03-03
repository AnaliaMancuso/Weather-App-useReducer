import React from "react";
import Weather from "./Weather";

export default {
  title: "Weather",
  component: Weather,
};

export const WeatherCloud = () => (
  <Weather temperature={"10"} state={"clouds"}></Weather>
);
export const WeatherSunny = () => (
  <Weather temperature={"30"} state={"clear"}></Weather>
);