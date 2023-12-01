import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { IUser } from '../../types/interfaces';
import { changePassword, updateUser } from '../../services/AuthService';

const UserProfile: React.FC = () => {
	const [userInfo, setUserInfo] = useState<IUser | null>(null);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	useEffect(() => {
		if (user) {
			setUserInfo(user);
		} else {
			navigate('/login');
		}
	}, [user, navigate]);

	const handleLogout = () => {
		logout();
		toast.info('Abmeldung erfolgreich.');
		navigate('/login');
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (!userInfo) return;
			await updateUser(userInfo);
			toast.success('Profil erfolgreich aktualisiert!');
			handleLogout();
		} catch (error: unknown) {
			toast.error('Fehler beim Aktualisieren des Profils.');
			console.error(error);
		}
	};

	const handlePasswordChange = async () => {
		if (!oldPassword || !newPassword) {
			toast.error('Bitte geben Sie das alte und das neue Passwort ein.');
			return;
		}
		try {
			await changePassword(oldPassword, newPassword);
			toast.success('Passwort erfolgreich geändert!');
			setOldPassword('');
			setNewPassword('');
			handleLogout();
		} catch (error: unknown) {
			toast.error('Fehler beim Ändern des Passworts.');
		}
	};

	if (!userInfo) {
		return <p>Lädt Benutzerprofil...</p>;
	}

	return (
		<div className="container mt-4">
			<h2>Benutzerprofil</h2>
			{editMode ? (
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Benutzername:
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							value={userInfo.username}
							onChange={(e) =>
								setUserInfo({
									...userInfo,
									username: e.target.value,
								})
							}
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
							value={userInfo.email}
							onChange={(e) =>
								setUserInfo({
									...userInfo,
									email: e.target.value,
								})
							}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Speichern
					</button>
					<button
						type="button"
						className="btn btn-secondary ms-2"
						onClick={() => setEditMode(false)}>
						Abbrechen
					</button>
				</form>
			) : (
				<>
					<div>
						<strong>Benutzername:</strong> {userInfo.username}
					</div>
					<div>
						<strong>Email:</strong> {userInfo.email}
					</div>
					<button
						onClick={() => setEditMode(true)}
						className="btn btn-primary mt-3">
						Bearbeiten
					</button>
				</>
			)}
			<h3 className="mt-3">Passwort ändern</h3>
			<div className="mb-3">
				<label htmlFor="oldPassword" className="form-label">
					Altes Passwort:
				</label>
				<input
					type="password"
					className="form-control"
					id="oldPassword"
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="newPassword" className="form-label">
					Neues Passwort:
				</label>
				<input
					type="password"
					className="form-control"
					id="newPassword"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<button onClick={handlePasswordChange} className="btn btn-primary">
				Passwort ändern
			</button>
			<button onClick={handleLogout} className="btn btn-danger">
				Abmelden
			</button>
		</div>
	);
};

export default UserProfile;
