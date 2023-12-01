import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { IUser } from '../../types/interfaces';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState<IUser['username']>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { login: doLogin } = useAuth();

	const validateForm = () => {
		if (!username.trim()) {
			toast.error('Bitte geben Sie einen Benutzernamen ein.');
			return false;
		}

		if (!password) {
			toast.error('Bitte geben Sie ein Passwort ein.');
			return false;
		}

		return true;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!validateForm()) return;

		setLoading(true); // Start loading state
		try {
			const response = await login(username, password);
			toast.success('Login erfolgreich!');
			doLogin(response.user); // Authentifizierungsstatus aktualisieren
			navigate('/profile');
		} catch (error: any) {
			// Hier wird der Typ `any` verwendet, um auf die Eigenschaften des Fehlers zugreifen zu können.
			setLoading(false); // Stop loading state
			const errorMessage =
				error.response?.data?.message ||
				'Login fehlgeschlagen: Bitte überprüfen Sie Ihre Anmeldeinformationen.';
			toast.error(errorMessage);
		}
	};

	return (
		<div className="container mt-4">
			<h2>Anmelden</h2>
			<form onSubmit={handleSubmit} className="mt-3">
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Benutzername:
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Passwort:
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					{loading ? 'Lädt...' : 'Anmelden'}
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
