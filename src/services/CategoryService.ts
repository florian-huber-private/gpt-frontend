import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/categories';

export const getCategories = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

export const getCategoryDetails = async (categoryId: number) => {
	const response = await axios.get(`${API_URL}/${categoryId}`);
	return response.data;
};

export const createCategory = async (categoryData: any) => {
	const response = await axios.post(API_URL, categoryData);
	return response.data;
};

export const updateCategory = async (categoryId: number, categoryData: any) => {
	const response = await axios.put(`${API_URL}/${categoryId}`, categoryData);
	return response.data;
};

export const deleteCategory = async (categoryId: number) => {
	await axios.delete(`${API_URL}/${categoryId}`);
};
