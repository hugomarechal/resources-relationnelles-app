import React, { useState } from 'react';
import FloatingInput from '../Form/FloatingInput';


const Login: React.FC = ({setUser}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await res.json() : {};

      if (!res.ok) {
        if (data.errors) {
          const errors = data.errors as { [key: string]: string[] };
          const allErrors = Object.values(errors).flat();
          throw new Error(allErrors[0]);
        }
        throw new Error(data.message || 'Échec de la connexion.');
      }

      setMessage('Connexion réussie.');

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        //localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      

      // Redirection optionnelle
      // window.location.href = '/dashboard';

    } catch (err: any) {
      setError(err.message || 'Erreur inconnue.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FloatingInput
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          name="password"
          label="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button type="submit" className="w-full bg-clip bg-gradient-to-r to-emerald-600 from-sky-400 text-white py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
