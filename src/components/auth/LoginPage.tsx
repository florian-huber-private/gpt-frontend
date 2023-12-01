import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthService';
import { IUser } from '../../types/interfaces';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<IUser["username"]>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      console.log('Login erfolgreich:', response);
      navigate('/profile');
    } catch (error) {
      console.error('Fehler beim Login:', error);
      // Hier könnten Sie einen Fehlerhinweis anzeigen
    }
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
