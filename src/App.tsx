import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserProfile from './components/auth/UserProfile';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import TaskDetails from './components/tasks/TaskDetails';
// import CategoryList from './components/categories/CategoryList';
// import CategoryForm from './components/categories/CategoryForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
        {/* <Route path="/categories" element={<CategoryList />} /> */}
        {/* <Route path="/create-category" element={<CategoryForm />} /> */}
        {/* <Route path="/edit-category/:id" element={<CategoryForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
