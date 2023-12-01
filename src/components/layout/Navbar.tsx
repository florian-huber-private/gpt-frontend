import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Pfad entsprechend anpassen

const Navbar: React.FC = () => {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();

	const handleLogout = () => {
		logout();
		// Weitere Aktionen nach dem Logout, wie z.B. Umleitung zur Startseite
	};

	// Funktion, die prüft, ob ein Link aktiv ist, basierend auf dem aktuellen Pfad
	const isActive = (path: string) =>
		location.pathname === path ? 'nav-link active' : 'nav-link';

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					TaskList App
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={isActive('/tasks')} to="/tasks">
								Aufgaben
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={isActive('/categories')}
								to="/categories">
								Kategorien
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav">
						{!isAuthenticated ? (
							<>
								<li className="nav-item">
									<Link
										className={isActive('/login')}
										to="/login">
										Anmelden
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className={isActive('/register')}
										to="/register">
										Registrieren
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link
										className={isActive('/profile')}
										to="/profile">
										Profil
									</Link>
								</li>
								<li className="nav-item">
									<button
										className="nav-link btn btn-link"
										onClick={handleLogout}>
										Abmelden
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
