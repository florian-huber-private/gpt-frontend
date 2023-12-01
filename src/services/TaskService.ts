import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/tasks';

const authHeader = () => {
  const userToken = localStorage.getItem('access_token');
  if (userToken) {
    return { Authorization: `Bearer ${userToken}` };
  } else {
    return {};
  }
};

export const getTasks = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await axios.post(API_URL, taskData, { headers: authHeader() });
  return response.data;
};

export const getTaskDetails = async (taskId: number) => {
  const response = await axios.get(`${API_URL}/${taskId}`, { headers: authHeader() });
  return response.data;
};

export const updateTask = async (taskId: number, taskData: any) => {
  const response = await axios.put(`${API_URL}/${taskId}`, taskData, { headers: authHeader() });
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  await axios.delete(`${API_URL}/${taskId}`, { headers: authHeader() });
};
