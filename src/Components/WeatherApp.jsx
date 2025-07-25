import React, { useState } from 'react';

function WeatherCard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError('');
      setWeather(null);

      const apiKey = 'YOUR_API_KEY'; // 🔑 Replace this with your actual OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-4">🌦️ Weather App</h3>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Get Weather
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {weather && weather.main && (
        <div className="text-center mt-4">
          <h4>
            {weather.name}, {weather.sys.country}
          </h4>
          <p className="lead">🌡️ {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
