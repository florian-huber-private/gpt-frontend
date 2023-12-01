import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
	element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		// Umleiten zur Login-Seite und den aktuellen Standort als "from" speichern
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return element;
};

export default ProtectedRoute;
