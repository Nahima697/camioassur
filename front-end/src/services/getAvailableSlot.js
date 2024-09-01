
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAvailableSlotsForAllBridges = async (start, end) => {
    try {
        const response = await axios.get(`${API_URL}/calendar/available-slots/all`, {
            params: { start, end }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des créneaux disponibles pour tous les ponts:', error);
        throw error;
    }
};

export const getAvailableSlotsByBridge = async (bridgeId, start, end) => {
    try {
        const response = await axios.get(`${API_URL}/calendar/available-slots`, {
            params: { bridgeId, start, end }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des créneaux disponibles pour le pont spécifique:', error);
        throw error;
    }
};
