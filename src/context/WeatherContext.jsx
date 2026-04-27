import { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastCity, setLastCity] = useState(null);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError({ type: 'validation', message: 'Please enter a city name', city: '' });
      return;
    }

    setLastCity(city.trim());
    setLoading(true);
    setError(null);

    try {
      const API_KEY = 'f117eca47cf0352e763110d47b203cf3';

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === '404') {
        setError({ type: 'notFound', message: `We couldn't find '${city.trim()}'. Check spelling?`, city: city.trim() });
        setWeather(null);
        setLoading(false);
        return;
      }

      if (data.cod === '401' || data.cod === '429') {
        setError({ type: 'api', message: 'Weather service issue. Try again shortly.', city: city.trim() });
        setWeather(null);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

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
    } catch {
      setError({ type: 'network', message: 'No connection. Check your internet.', city: city.trim() });
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    if (lastCity) {
      fetchWeather(lastCity);
    }
  };

  const clearWeather = () => {
    setWeather(null);
    setError(null);
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, fetchWeather, clearWeather, retry }}>
      {children}
    </WeatherContext.Provider>
  );
};