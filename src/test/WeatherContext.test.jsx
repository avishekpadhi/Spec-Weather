import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { WeatherProvider, useWeather } from '../context/WeatherContext';

const TestComponent = ({ city = '' }) => {
  const { weather, loading, error, fetchWeather, clearWeather } = useWeather();
  return (
    <div>
      <span data-testid="loading">{loading.toString()}</span>
      <span data-testid="error">{error}</span>
      <span data-testid="weather">{JSON.stringify(weather)}</span>
      <input data-testid="city-input" onChange={(e) => city = e.target.value} />
      <button onClick={() => fetchWeather(city)} data-testid="fetch">Fetch</button>
      <button onClick={clearWeather} data-testid="clear">Clear</button>
    </div>
  );
};

describe('WeatherContext', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('initializes with null weather and no loading', () => {
    const { getByTestId } = render(<WeatherProvider><TestComponent /></WeatherProvider>);
    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(getByTestId('weather')).toHaveTextContent('null');
  });

  it('sets error when fetching with empty city', async () => {
    const { getByTestId } = render(<WeatherProvider><TestComponent city="" /></WeatherProvider>);
    
    fireEvent.click(getByTestId('fetch'));

    expect(getByTestId('error')).toHaveTextContent('Please enter a city name');
  });

  it('fetches weather successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        name: 'London',
        sys: { country: 'GB' },
        main: { temp: 20, feels_like: 18, humidity: 65 },
        weather: [{ description: 'cloudy', icon: '04d' }],
        wind: { speed: 5 },
      }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    const { getByTestId } = render(<WeatherProvider><TestComponent city="London" /></WeatherProvider>);
    
    fireEvent.click(getByTestId('fetch'));

    await waitFor(() => {
      expect(getByTestId('weather')).toHaveTextContent('London');
    });
  });

  it('handles API errors', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { getByTestId } = render(<WeatherProvider><TestComponent city="London" /></WeatherProvider>);
    
    fireEvent.click(getByTestId('fetch'));

    await waitFor(() => {
      expect(getByTestId('error')).toHaveTextContent('City not found');
    });
  });

  it('clears weather and error', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        name: 'London',
        sys: { country: 'GB' },
        main: { temp: 20, feels_like: 18, humidity: 65 },
        weather: [{ description: 'cloudy', icon: '04d' }],
        wind: { speed: 5 },
      }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    const { getByTestId } = render(<WeatherProvider><TestComponent city="London" /></WeatherProvider>);
    
    fireEvent.click(getByTestId('fetch'));

    await waitFor(() => {
      expect(getByTestId('weather')).toHaveTextContent('London');
    });

    fireEvent.click(getByTestId('clear'));

    expect(getByTestId('weather')).toHaveTextContent('null');
    expect(getByTestId('error')).toHaveTextContent('');
  });
});