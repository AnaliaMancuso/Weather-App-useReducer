import { useState, useEffect } from "react";
import axios from "axios";
import { getWeatherUrl } from "../utils/urls";
import { getCityCode } from "../utils/utils";
import getAllWeather from "../utils/transform/getAllWeather";

const useCityList = (cities, allWeather, actions ) => {
  // const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const url = getWeatherUrl({city, countryCode})
      try {

        actions({type: 'SET_ALL_WEATHER', payload: {[getCityCode(city, countryCode)]:{}}})
        
        const response = await axios.get(url);
        const allWeatherAux = getAllWeather(response, city, countryCode)

        actions({type: 'SET_ALL_WEATHER', payload: allWeatherAux})
        
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          console.log(data, status);
          setError("Ha ocurrido un error en el servidor del clima");
        } else if (error.request) {
          console.log("inaccessible server");
          setError("Verifique la conección a internet");
        } else {
          console.log("unforeseen error");
          setError("Error al cargar los datos");
        }
      }
    };
    cities.forEach(({ city, countryCode }) => {
      if (!allWeather[getCityCode(city, countryCode)]) {
        setWeather(city, countryCode);
      }
      
    });
  }, [cities, allWeather, actions]);
  return { error, setError };
};

export default useCityList;
