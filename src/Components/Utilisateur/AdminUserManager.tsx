import React, { useEffect, useState } from 'react';
import SwitchToggle from '../Divers/SwitchToggle';
import { FaPlus } from 'react-icons/fa';
import Button from '../Divers/Button';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  actif: boolean;
}

const AdminUserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

 const fetchUsers = async () => {
  try {
    setLoading(true);
    const res = await fetch('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const result = await res.json();
    setUsers(result.data); 
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs.');
  } finally {
    setLoading(false);
  }
};

  const toggleUser = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/users/${id}/toggle`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchUsers(); // recharge la liste après changement
    } catch (err) {
      console.error('Erreur lors de l’activation/désactivation.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">
        Gestion des comptes utilisateurs
      </h2>

      <div className="mb-5">
        <Button
          icon={<FaPlus size={20} />}
          onClick={() => {
            console.log("Bonjour");
          }}
        />
      </div>

      <tr>
        <th scope="col" className="px-6 py-4">
          Libellé
        </th>
        <th scope="col" className="px-6 py-4">
          Actif
        </th>
        <th scope="col" className="px-6 py-4">
          <span className="sr-only">Modifier</span>
        </th>
        <th scope="col" className="px-6 py-4">
          <span className="sr-only">Supprimer</span>
        </th>
      </tr>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-2">
              Nom
            </th>
            <th scope="col" className="px-6 py-2">
              Prénom
            </th>
            <th scope="col" className="px-6 py-2">
              Email
            </th>
            <th scope="col" className="px-2 py-2">
              Actif
            </th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 50).map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-2">{user.nom}</td>
              <td className="px-6 py-2">{user.prenom}</td>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-2 py-2">
                <SwitchToggle
                  checked={user.actif}
                  onToggle={() => toggleUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManager;
