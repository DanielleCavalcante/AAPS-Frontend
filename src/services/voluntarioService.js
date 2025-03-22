// Definindo os endpoints para a API de Voluntários
const VOLUNTARIO_API_URL = "/voluntarios";

// Função para pegar todos os voluntários (GET)
export const getAllVoluntarios = () => {
  return `${VOLUNTARIO_API_URL}`;
};

// Função para criar um voluntário (POST)
export const createVoluntario = () => {
  return `${VOLUNTARIO_API_URL}`;
};

// Função para atualizar um voluntário (PUT)
export const updateVoluntario = (id) => {
  return `${VOLUNTARIO_API_URL}/${id}`;
};

// Função para excluir um voluntário (DELETE)
export const deleteVoluntario = (id) => {
  return `${VOLUNTARIO_API_URL}/${id}`;
};