import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">TaskList App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/tasks">Aufgaben</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Kategorien</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Anmelden</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registrieren</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
