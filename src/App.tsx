import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
// import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserProfile from './components/auth/UserProfile';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import TaskDetails from './components/tasks/TaskDetails';
import CategoryList from './components/categories/CategoryList';
import CategoryForm from './components/categories/CategoryForm';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Routes>
					{/* <Route path="/" element={<HomePage />} /> */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route
						path="/profile"
						element={<ProtectedRoute element={<UserProfile />} />}
					/>
					<Route
						path="/tasks"
						element={<ProtectedRoute element={<TaskList />} />}
					/>
					<Route
						path="/task/:id"
						element={<ProtectedRoute element={<TaskDetails />} />}
					/>
					<Route
						path="/create-task"
						element={<ProtectedRoute element={<TaskForm />} />}
					/>
					<Route
						path="/edit-task/:id"
						element={<ProtectedRoute element={<TaskForm />} />}
					/>
					<Route
						path="/categories"
						element={<ProtectedRoute element={<CategoryList />} />}
					/>
					<Route
						path="/create-category"
						element={<ProtectedRoute element={<CategoryForm />} />}
					/>
					<Route
						path="/edit-category/:id"
						element={<ProtectedRoute element={<CategoryForm />} />}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
