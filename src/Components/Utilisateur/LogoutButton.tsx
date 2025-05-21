import React from 'react';
import Button from "../Divers/Button.tsx";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn("Token introuvable, suppression locale seulement.");
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Suppression du token et de l'utilisateur dans tous les cas
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (!res.ok) {
        console.error('Erreur lors de la déconnexion (backend).');
        window.location.href = '/login';
        return;
      }

      // Redirection après déconnexion réussie
      window.location.href = '/login';
    } catch (err) {
      console.error('Erreur réseau lors du logout', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <Button onClick={handleLogout} color={'red'} label={'Déconnexion'}/>
  );
};

export default LogoutButton;
