// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-railway-backend-url.railway.app';

export const API_ENDPOINTS = {
    LOCATIONS: `${API_BASE_URL}/api/locations`,
    MERCHANDISE: `${API_BASE_URL}/api/merchandise`,
    REVIEWS: `${API_BASE_URL}/api/locations/reviews`,
    SUBMIT_LOCATION: `${API_BASE_URL}/api/locations/submit`,
};

export default API_BASE_URL; 