import React, { useState } from 'react';
import FloatingInput from './FloatingInput';

const PasswordReset: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
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
      const res = await fetch('http://127.0.0.1:8000/api/user/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
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
    throw new Error(data.message || 'Erreur lors de la réinitialisation.');
    }


      setMessage('Mot de passe réinitialisé avec succès.');
      setFormData({ email: '', password: '', password_confirmation: '' });
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded shadow">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">Réinitialisation du mot de passe</h2>
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
          label="Nouveau mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          name="password_confirmation"
          label="Confirmation du mot de passe"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button type="submit" className="w-full bg-clip bg-gradient-to-r to-emerald-600 from-sky-400 text-white py-2 rounded hover:bg-blue-700">
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
