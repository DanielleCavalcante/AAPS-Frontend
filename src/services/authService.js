import api from '../api/api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/Autenticacao/Login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};

export const logout = async () => {
  // 
};