export const getLatLong = async (
  street: string,
  city: string,
  state: string
): Promise<{ x: number; y: number } | null> => {
  try {
    const url = `https://geocoding.geo.census.gov/geocoder/geographies/address?street=${encodeURIComponent(
      street
    )}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(
      state
    )}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (
      data.result &&
      data.result.addressMatches &&
      data.result.addressMatches.length > 0
    ) {
      const coordinates = data.result.addressMatches[0].coordinates;
      return coordinates;
    } else {
      console.log("No coordinates found for: ", street);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};
