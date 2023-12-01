import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implementieren Sie hier die Logik zur Authentifizierung
    console.log('Login:', username, password);
    // Nach erfolgreicher Anmeldung, navigieren Sie zum Profil oder einer anderen Seite
    navigate('/profile');
  };

  return (
    <div>
      <h2>Anmelden</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Passwort:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Anmelden</button>
      </form>
    </div>
  );
};

export default LoginPage;
