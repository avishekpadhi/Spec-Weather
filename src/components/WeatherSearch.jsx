import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
        aria-label="City name"
      />
      <button type="submit" disabled={loading || !city.trim()} className="search-button">
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default WeatherSearch;