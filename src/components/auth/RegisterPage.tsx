import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/AuthService';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await register(username, email, password);
      console.log('Registrierung erfolgreich:', response);
      navigate('/login');
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      // Hier könnten Sie einen Fehlerhinweis anzeigen
    }
  };

  return (
    <div>
      <h2>Registrieren</h2>
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
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterPage;
