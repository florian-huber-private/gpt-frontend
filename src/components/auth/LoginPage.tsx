import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { IUser } from '../../types/interfaces';

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState<IUser['username']>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const { login: doLogin } = useAuth();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await login(username, password);
			console.log('Login erfolgreich:', response);
			doLogin(); // Authentifizierungsstatus aktualisieren
			navigate('/profile');
		} catch (error) {
			console.error('Fehler beim Login:', error);
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
					Anmelden
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
