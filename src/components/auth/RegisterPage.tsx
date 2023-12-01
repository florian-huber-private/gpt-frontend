import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/AuthService';
import { IUser } from '../../types/interfaces';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
	const [username, setUsername] = useState<IUser['username']>('');
	const [email, setEmail] = useState<IUser['email']>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!username.trim()) {
			toast.error('Bitte geben Sie einen Benutzernamen ein.');
			return;
		}

		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
		if (!emailRegex.test(email)) {
			toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
			return;
		}

		const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
		if (!passwordRegex.test(password)) {
			toast.error(
				'Das Passwort muss mindestens 8 Zeichen lang sein und Zahlen, Groß- und Kleinbuchstaben enthalten.'
			);
			return;
		}

		try {
			await register(username, email, password);
			toast.success('Registrierung erfolgreich!');
			navigate('/login');
		} catch (error: unknown) {
			console.error('Fehler bei der Registrierung:', error);
			let errorMessage = 'Fehler bei der Registrierung.';
			if (error instanceof Error && error.message) {
				errorMessage = error.message; // oder eine andere Logik zur Anzeige von Fehlermeldungen
			}
			toast.error(errorMessage);
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
