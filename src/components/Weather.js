import React, { useState, useEffect } from "react";
import apiKeys from "../api/apiKeys";
import Clock from "react-live-clock";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";

const dateBuilder = (d) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const de = d.toLocaleDateString(undefined, options);
  return de;
};

function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [info, setInfo] = useState({});
  const [coord, setCoord] = useState({ lat: 1.34, lon: 103.71 }); // Set Singapore as the location

  useEffect(() => {
    loadWeather();
  }, []);

  useEffect(() => {
    determineIcon(info ? info.icon : "CLEAR_DAY");
  }, [info]);

  function determineIcon(myIcon) {
    switch (myIcon) {
      case "Haze":
        setIcon("CLEAR_DAY");
        break;
      case "Clouds":
        setIcon("CLOUDY");
        break;
      case "Rain":
        setIcon("RAIN");
        break;
      case "Snow":
        setIcon("SNOW");
        break;
      case "Dust":
        setIcon("WIND");
        break;
      case "Drizzle":
        setIcon("SLEET");
        break;
      case "Fog":
        setIcon("FOG");
        break;
      case "Smoke":
        setIcon("FOG");
        break;
      case "Tornado":
        setIcon("WIND");
        break;
      default:
        setIcon("CLEAR_DAY");
    }
  }

  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  if (navigator.geolocation) {
    getPosition().then((position) => {
      setCoord({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  } else {
    alert("Geolocation not available");
  }

  const loadWeather = async () => {
    try {
      const response = await axios.get(
        `${apiKeys.base}weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&APPID=${apiKeys.key}`
      );
      let res = response.data;
      console.log("console info", res);
      setInfo({
        city: res.name,
        temp: Math.round(res.main.temp),
        icon: res.weather[0].main,
        country: res.sys.country,
      });
      setIsLoading(true);
    } catch (error) {
      console.log("❌ error: " + error.message);
    } finally {
      console.log("the SetInfo data", info);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="city">
          <div className="title">
            <h2>{info.city}</h2>
            <h3>{info.country}</h3>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {Math.round(info.temp)}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <WeatherForecast icon={icon} weather={info.icon} />
      </>
    );
  } else {
    return null;
  }
}

export default Weather;
