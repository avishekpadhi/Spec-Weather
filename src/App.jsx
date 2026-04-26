import './App.css';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
    </button>
  );
}

function App() {
  return (
    <WeatherProvider>
      <ThemeProvider>
        <div className="app">
          <ThemeToggle />
          <h1>Weather App</h1>
          <WeatherSearch />
          <WeatherDisplay />
        </div>
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default App;