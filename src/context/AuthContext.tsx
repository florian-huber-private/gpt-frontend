import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/interfaces';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (user: IUser) => void;
	logout: () => void;
	user: IUser | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
	return useContext(AuthContext);
};

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);

	const login = (user: IUser) => {
		setUser(user);
		setIsAuthenticated(true);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('access_token');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
