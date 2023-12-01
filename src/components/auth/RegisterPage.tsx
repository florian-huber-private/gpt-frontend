import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/AuthService';
import { IUser } from '../../types/interfaces';

const RegisterPage: React.FC = () => {
	const [username, setUsername] = useState<IUser['username']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await register(username, email, password);
			console.log('Registrierung erfolgreich:', response);
			navigate('/login');
		} catch (error) {
			console.error('Fehler bei der Registrierung:', error);
		}
	};

	return (
		<div className="container mt-4">
			<h2>Registrieren</h2>
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
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
					Registrieren
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
