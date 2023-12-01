import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/auth';

interface AuthResponse {
  token: string;
  user: {
    username: string;
    email: string;
  };
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.access_token) {
    localStorage.setItem('access_token', response.data.access_token);
  }
  return response.data;
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};
