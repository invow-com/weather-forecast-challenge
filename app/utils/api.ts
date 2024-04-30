import axios from 'axios';

// Define la URL base de la API del Servicio Meteorológico Nacional de EE. UU.
const BASE_URL = 'https://api.weather.gov/';

// Define la función para obtener el pronóstico del clima para una dirección dada
export const getWeatherData = async (address: string): Promise<any> => {
    try {
        // Realiza una llamada a la API de geocodificación para obtener las coordenadas de la dirección
        const coordinates = await geocodeAddress(address);

        // Si se obtienen las coordenadas, llama a la API del Servicio Meteorológico Nacional para obtener el pronóstico del clima
        if (coordinates) {
            const { latitude, longitude } = coordinates;
            const url = `${BASE_URL}points/${latitude},${longitude}/forecast`;
            const response = await axios.get(url);

            // Retorna los datos del pronóstico del clima
            return response.data;
        } else {
            // Si no se obtienen las coordenadas, retorna un mensaje de error
            throw new Error('No se pudieron obtener las coordenadas de la dirección proporcionada.');
        }
    } catch (error) {
        // Captura cualquier error y lo maneja
        throw new Error(`Error al obtener el pronóstico del clima`);
    }
};

// Define la función para llamar a la API de geocodificación y obtener las coordenadas de una dirección
const geocodeAddress = async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
    try {
        // Llama a la API de geocodificación (debes implementar esta parte)
        // Aquí debes realizar la llamada a la API de geocodificación del Censo de EE. UU.
        // y obtener las coordenadas correspondientes a la dirección proporcionada
        // Retorna las coordenadas si la llamada es exitosa
        // De lo contrario, retorna null
        return { latitude: 0, longitude: 0 }; // Esto es solo un placeholder, debes implementar la llamada real a la API de geocodificación
    } catch (error) {
        // Captura cualquier error y lo maneja
        console.error('Error en la geocodificación:', error);
        return null;
    }
};