import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/HomePage';
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
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/tasks" component={TaskList} />
        <Route path="/task/:id" component={TaskDetails} />
        <Route path="/create-task" component={TaskForm} />
        <Route path="/edit-task/:id" component={TaskForm} />
        <Route path="/categories" component={CategoryList} />
        <Route path="/create-category" component={CategoryForm} />
        <Route path="/edit-category/:id" component={CategoryForm} />
      </Switch>
    </Router>
  );
}

export default App;
