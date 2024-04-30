export const getWeather = async (x: number, y: number) => {
  const url = `https://api.weather.gov/points/${encodeURIComponent(
    y
  )},${encodeURIComponent(x)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data) {
    const forecastURL = data.properties.forecast;
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();
    if (
      forecastData &&
      forecastData.properties &&
      forecastData.properties.periods
    ) {
      return forecastData.properties.periods;
    } else {
      console.log("No forecast data found.");
      return null;
    }
  } else {
    console.log("No weather data found for: " + x + " " + y);
    return null;
  }
};
