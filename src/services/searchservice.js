import api from './api';

// Normal flight search
export const searchFlights = async (criteria) => {
  const response = await api.post('/api/search/flights', criteria);
  return response.data;
};

// Advanced flight search
export const advancedSearchFlights = async (criteria, airlines = [], minPrice = 0, maxPrice = 999999) => {
  const params = new URLSearchParams();
  airlines.forEach(a => params.append('airlines', a));
  params.append('minPrice', minPrice);
  params.append('maxPrice', maxPrice);
  const response = await api.post(`/api/search/flights/advanced?${params.toString()}`, criteria);
  return response.data;
};