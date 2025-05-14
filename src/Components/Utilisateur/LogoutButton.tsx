import React from 'react';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        console.error('Erreur lors de la déconnexion');
        return;
      }

      localStorage.removeItem('token');
      // Redirection possible après déconnexion
      window.location.href = '/login';
    } catch (err) {
      console.error('Erreur réseau lors du logout', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-sky-400 to-emerald-600 text-white py-2 px-4 rounded hover:opacity-90"
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
