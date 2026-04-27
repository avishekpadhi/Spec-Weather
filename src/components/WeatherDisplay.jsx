import { useWeather } from '../context/WeatherContext';

const errorIcons = {
  notFound: '\u{1F50D}',
  api: '\u2699\uFE0F',
  network: '\u{1F310}',
  validation: '\u{1F530}',
};

const WeatherDisplay = () => {
  const { weather, error, retry } = useWeather();

  if (error) {
    const icon = errorIcons[error.type] || '\u26A0\uFE0F';
    return (
      <div className="error">
        <span className="error-icon">{icon}</span>
        <span className="error-message">{error.message}</span>
        <button onClick={retry} className="retry-button">
          Try Again
        </button>
      </div>
    );
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