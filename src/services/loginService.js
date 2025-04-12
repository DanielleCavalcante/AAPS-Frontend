import api from '../apis/api';

const API_URL = import.meta.env.VITE_API_URL;

export const loginService = async (credentials) => {
  const response = await api.post(`${API_URL}/Autenticacao/Login`, credentials);
  return response.data;
};