import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherSearch from '../components/WeatherSearch';

const mockFetchWeather = vi.fn();

vi.mock('../context/WeatherContext', () => ({
  useWeather: vi.fn(),
}));

import { useWeather } from '../context/WeatherContext';

describe('WeatherSearch', () => {
  beforeEach(() => {
    mockFetchWeather.mockClear();
    useWeather.mockReturnValue({
      fetchWeather: mockFetchWeather,
      loading: false,
    });
  });

  it('renders input and button', () => {
    render(<WeatherSearch />);
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls fetchWeather on form submit', () => {
    render(<WeatherSearch />);
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.submit(button);

    expect(mockFetchWeather).toHaveBeenCalledWith('London');
  });

  it('trims whitespace from city name', () => {
    render(<WeatherSearch />);
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '  Paris  ' } });
    fireEvent.submit(button);

    expect(mockFetchWeather).toHaveBeenCalledWith('Paris');
  });

  it('does not call fetchWeather for empty input', () => {
    render(<WeatherSearch />);
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.submit(button);

    expect(mockFetchWeather).not.toHaveBeenCalled();
  });

  it('button shows "Searching..." when loading', () => {
    useWeather.mockReturnValue({
      fetchWeather: mockFetchWeather,
      loading: true,
    });

    render(<WeatherSearch />);
    expect(screen.getByRole('button')).toHaveTextContent('Searching...');
  });
});