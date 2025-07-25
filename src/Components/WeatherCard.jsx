import React, { useState } from 'react';

function WeatherCard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return alert('Please enter a city name');
    try {
      const apiKey = 'c36c921ba85e0b42027721197a5e2bda'; // Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert('City not found');
        setWeather(null);
      }
    } catch (error) {
      alert('Failed to fetch weather');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-50 bg-light">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: '350px', background: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)' }}>
        <h3 className="text-center mb-4 fw-bold text-primary">🌤 Weather App</h3>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control rounded-start-pill"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-outline-primary rounded-end-pill fw-bold mx-2" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {weather && (
          <>
            <div className="text-center mb-3">
              <h4 className="fw-semibold">{weather.name}, {weather.sys.country}</h4>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="Weather icon"
                className="my-2"
              />
              <h1 className="display-4 fw-bold">{Math.round(weather.main.temp)}°C</h1>
              <p className="text-capitalize text-muted">{weather.weather[0].description}</p>
            </div>

            <div className="bg-white rounded-4 p-3 shadow-sm">
              <div className="d-flex justify-content-between mb-2">
                <span>💧 Humidity:</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>💨 Wind:</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>🌡️ Feels Like:</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
