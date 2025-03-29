import api from '../apis/api';

const API_URL = import.meta.env.VITE_API_URL;

export const loginService = async (credentials) => {
  try {
    const response = await api.post(`${API_URL}/Autenticacao/Login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};