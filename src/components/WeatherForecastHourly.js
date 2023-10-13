import React, { useState, useEffect } from "react";
import apiKeys from "../api/apiKeys";
import axios from "axios";
import "../App.css";

function WeatherForecastHourly(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    loadForecast();
  }, [props.coordinates]);

  const loadForecast = async () => {
    try {
      const response = await axios.get(
        `${apiKeys.base}forecast?lat=${props.coordinates.lat}&lon=${props.coordinates.lon}&appid=${apiKeys.key}&units=metric`
      );

      //console.log(response.data);
      setForecast(response.data);
      setIsLoading(true);
    } catch (error) {
      console.log("❌ error: " + error.message);
    } finally {
      console.log("forecast", forecast);
    }
  };

  console.log("forecast", forecast);

  if (isLoading) {
    return (
      <div>
        {forecast.list.slice(0, 5).map((item, idx) => (
          <span className="image-with-text" key={idx}>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            />
            <label className="time-temp">
              {props.converter(item.dt)} | {Math.round(item.main.temp)}°C
            </label>
          </span>
        ))}
        ;
      </div>
    );
  } else {
    return null;
  }
}

export default WeatherForecastHourly;
