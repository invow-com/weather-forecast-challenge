"use client";
import { useState } from "react";
import Loader from "./components/Loader";
import { getLatLong } from "./api/geocoding";
import { getWeather } from "./api/weather";
import WeatherCard from "./components/WeatherCard";
import Image from "next/image";
import ErrorModal from "./components/ErrorModal";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [street, setStreet] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeatherData(null);
    setLoading(true);
    if (street && streetNum && city && state)
      try {
        const data = await getLatLong(streetNum + " " + street, city, state);
        if (data != null) {
          const periods = await getWeather(data.x, data.y);
          setWeatherData(periods);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-100 pb-20">
      <header className="bg-blue-500 p-6 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <img src="/weather.png" alt="Weather Icon" className="h-20" />
          <h1 className="text-white text-5xl lg:text-8xl font-bold w-full text-center">
            The Weather App
          </h1>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col pt-20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col">
            <label htmlFor="street" className="text-gray-600 mb-1 pl-2">
              Street
            </label>
            <input
              type="text"
              id="street"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Sylver Hill Rd..."
              className="w-full md:w-96 px-4 py-2 rounded-full border border-blue-400 focus:outline-none focus:border-blue-500 shadow-md mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="streetNum" className="text-gray-600 mb-1 pl-2">
              Street Number
            </label>
            <input
              type="text"
              id="streetNum"
              required
              value={streetNum}
              onChange={(e) => setStreetNum(e.target.value)}
              placeholder="4600..."
              className="w-full md:w-40 px-4 py-2 rounded-full border border-blue-400 focus:outline-none focus:border-blue-500 shadow-md mb-4"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-600 mb-1 pl-2">
              City
            </label>
            <input
              type="text"
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Washington..."
              className="w-full md:w-96 px-4 py-2 rounded-full border border-blue-400 focus:outline-none focus:border-blue-500 shadow-md mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="text-gray-600 mb-1 pl-2">
              State
            </label>
            <input
              type="text"
              id="state"
              required
              value={state}
              maxLength={2}
              onChange={(e) => setState(e.target.value)}
              placeholder="DC..."
              className="w-full md:w-40 px-4 py-2 rounded-full border border-blue-400 focus:outline-none focus:border-blue-500 shadow-md mb-4"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 my-4 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
        >
          Get Forecast
        </button>
      </form>

      {loading && <Loader />}

      {error && (
        <ErrorModal onClick={handleClose} />
      )}

      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-auto py-8">
          {weatherData.map((period: any, index: number) => (
            <WeatherCard period={period} />
          ))}
        </div>
      )}
    </main>
  );
}
