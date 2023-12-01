import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		// Hier könnten Sie zusätzliche Logik implementieren, z.B. den Benutzer zur Startseite umleiten
	};

	return (
		<div className="container mt-4">
			<h2>Benutzerprofil</h2>
			{/* Hier würde die Logik zur Anzeige und Bearbeitung des Benutzerprofils kommen. */}
			<p>Profilinformationen...</p>
			<button onClick={handleLogout} className="btn btn-danger">
				Abmelden
			</button>
		</div>
	);
};

export default UserProfile;
