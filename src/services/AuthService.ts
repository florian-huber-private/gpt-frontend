import axios from 'axios';
import { AuthResponse, IUser } from '../types/interfaces';

const API_URL = 'http://127.0.0.1:5000';

export const login = async (
	username: string,
	password: string
): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/auth/login`, {
		username,
		password,
	});
	if (response.data.access_token) {
		localStorage.setItem('access_token', response.data.access_token);
	}
	return response.data;
};

export const register = async (
	username: string,
	email: string,
	password: string
): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/auth/register`, {
		username,
		email,
		password,
	});
	return response.data;
};

export const updateUser = async (updatedData: IUser): Promise<AuthResponse> => {
	const response = await axios.put(`${API_URL}/user/profile`, updatedData, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
		},
	});
	return response.data;
};

export const changePassword = async (
	oldPassword: string,
	newPassword: string
): Promise<AuthResponse> => {
	const response = await axios.put(
		`${API_URL}/user/profile/change-password`,
		{
			oldPassword,
			newPassword,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`,
			},
		}
	);
	return response.data;
};
