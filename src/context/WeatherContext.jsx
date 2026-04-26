import { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_KEY = 'f117eca47cf0352e763110d47b203cf3';

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please set VITE_OPENWEATHER_API_KEY in .env');
        }
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const clearWeather = () => {
    setWeather(null);
    setError(null);
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, fetchWeather, clearWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};