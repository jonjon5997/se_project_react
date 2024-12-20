export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  // Extract and map values
  const temperature = data.main.temp;
  result.city = data.name;
  (result.temp = {
    F: `${Math.round(temperature)}`,
    C: `${Math.round(((temperature - 32) * 5) / 9)}`,
  }), // Assuming temperature is already in Fahrenheit
    (result.type = getWeatherType(data.main.temp)); // Pass temperature directly
  result.condition = data.weather[0]?.main.toLowerCase(); // Ensure proper case and fallback
  result.isDay = isDay(data.sys, Date.now());
  result.weatherType = getWeatherType(temperature);

  // Log the processed result for debugging
  console.log("Raw weather data:", data);
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: `${Math.round(temperature)}`,
      C: `${Math.round(((temperature - 32) * 5) / 9)}`,
    },
  };
  console.log(weather);
  return weather;
};

// weather.temperature.F = data.main.temp;
// weather.temperature.C = Math.round((data.main.temp - 32) * 5/9);
