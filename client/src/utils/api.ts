import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 120000,
});

export const sendMessage = async (
  message: string,
  model: string = "llama-3.1-8b-instant"
) => {
  const response = await api.post("/chat", { message, model });
  return response.data;
};

export default api;