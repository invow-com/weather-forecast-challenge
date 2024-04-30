"use client";
import { useState } from "react";
import Loader from "./components/Loader";
import { getLatLong } from "./api/geocoding";
import { getWeather } from "./api/weather";
import WeatherCard from "./components/WeatherCard";
import Image from "next/image";

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
    <main className="flex flex-col items-center min-h-screen bg-blue-100">
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
              placeholder="Silver Hill Rd..."
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
              onChange={(e) => {
                const input = e.target.value;
                const regex = /^[0-9]*$/;
                if (regex.test(input)) {
                  setStreetNum(input);
                }
              }} placeholder="4600..."
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
        >
          Get Forecast
        </button>
      </form>

      {loading && <Loader />}

      {error && (
        <div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-sm relative">
            <span
              className="absolute p-4 cursor-pointer"
              onClick={handleClose}
            ></span>
            <div className="relative">
              <Image
                src="/clouds.png"
                alt="img"
                width={300}
                height={200}
                className="mx-auto opacity-60"
              />
              <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[95px] z-10 text-center text-black text-opacity-60 whitespace-nowrap">
                Seems like you entered an invalid address
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {weatherData && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-auto py-8">
          {weatherData.map((period: any, index: number) => (
            <WeatherCard key={index} period={period} />
          ))}
        </div>
      )}
    </main>
  );
}
