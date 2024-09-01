import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const bookingService = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la réservation:', error);
        throw error;
    }
};