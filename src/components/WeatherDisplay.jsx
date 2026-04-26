import { useWeather } from '../context/WeatherContext';

const WeatherDisplay = () => {
  const { weather, error } = useWeather();

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div className="placeholder">Search for a city to see weather</div>;
  }

  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <p>{weather.country}</p>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <span className="temperature">{weather.temperature}°C</span>
      </div>
      <p className="description">{weather.description}</p>
      <div className="weather-details">
        <div className="detail">
          <span>Feels like</span>
          <span>{weather.feelsLike}°C</span>
        </div>
        <div className="detail">
          <span>Humidity</span>
          <span>{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span>Wind</span>
          <span>{weather.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;