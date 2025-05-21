import React, { useState } from 'react';
import FloatingInput from '../Form/FloatingInput';
import { SelectBox } from '../Form/SelectBox';
import { ISelectBoxOption } from '../../types/SelectBoxOption';
import api from '../../api/apiConfiguration';
const token = localStorage.getItem('token');

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    password: '',
    password_confirmation: '',
    code_postal: '',
    ville: '',
    role_id: '4' // par défaut citoyen
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      ...formData,
      actif: true
    };

    try {
      const res = await api.post('users', payload, {
        headers: {
        Authorization: `Bearer ${token}`
        }});
      setMessage('Compte créé avec succès !');
      setFormData({
        nom: '',
        prenom: '',
        pseudo: '',
        email: '',
        password: '',
        password_confirmation: '',
        code_postal: '',
        ville: '',
        role_id: '4'
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte.');
    }
  };

  const villesOptions: ISelectBoxOption[] = [
    { label: 'Paris', value: 'Paris' },
    { label: 'Lyon', value: 'Lyon' },
    { label: 'Marseille', value: 'Marseille' }
  ];

  const rolesOptions: ISelectBoxOption[] = [
    { label: 'Super administrateur', value: '1' },
    { label: 'Administrateur', value: '2' },
    { label: 'Modérateur', value: '3' },
    { label: 'Citoyen', value: '4' }
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-10">Créer un compte administrateur</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FloatingInput type="text" label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
        <FloatingInput type="text" label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} required />
        <FloatingInput type="text" label="Pseudo" name="pseudo" value={formData.pseudo} onChange={handleChange} required />
        <FloatingInput type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <FloatingInput type="password" label="Mot de passe" name="password" value={formData.password} onChange={handleChange} required />
        <FloatingInput type="password" label="Confirmation du mot de passe" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
        <FloatingInput type="text" label="Code postal" name="code_postal" value={formData.code_postal} onChange={handleChange} required />

        <p className="text-sm text-gray-400 mb-1 text-left">Ville</p>
        <SelectBox
          label=""
          name="ville"
          value={formData.ville}
          options={villesOptions}
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-400 mb-1 text-left">Rôle</p>
        <SelectBox
          label=""
          name="role_id"
          value={formData.role_id}
          options={rolesOptions}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <button type="submit" className="w-full bg-clip bg-gradient-to-r to-emerald-600 from-sky-400 text-white py-2 rounded hover:bg-blue-700">
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;