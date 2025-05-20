import React, { useEffect, useState } from 'react';
import SwitchToggle from '../Divers/SwitchToggle';

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
      <h2 className="text-2xl font-bold mb-6">Gestion des comptes utilisateurs</h2>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Nom</th>
              <th className="p-2">Prénom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actif</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 50).map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.nom}</td>
                <td className="p-2">{user.prenom}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <SwitchToggle
                    checked={user.actif}
                    onToggle={() => toggleUser(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManager;
