import React, { useEffect, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { API_BASE_URL } from "../../api/apiUrl";

const UserUpdate: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    pseudo: "",
    ville: "",
    code_postal: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch(API_BASE_URL + "me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateField = async (field?: string) => {
    let payload: Record<string, string> = {};

    if (field) {
      if (!formData[field as keyof typeof formData]) return; // ne rien envoyer si vide
      payload[field] = formData[field as keyof typeof formData];
    } else {
      // mise à jour globale : on prend tous les champs non vides
      for (const key in formData) {
        if (formData[key as keyof typeof formData]) {
          payload[key] = formData[key as keyof typeof formData];
        }
      }
      if (Object.keys(payload).length === 0) return; // rien à envoyer
    }

    try {
      const res = await fetch(API_BASE_URL + "update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de mise à jour");

      setMessage("Mise à jour réussie");
      setFormData({ ...formData, ...(field ? { [field]: "" } : {}) });
      fetchUser(); // mettre à jour l'affichage
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-30 rounded shadow text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Mon merveilleux profil
      </h2>

      {userData &&
        Object.entries(formData).map(([key, value]) => (
          <div key={key} className="mb-6">
            <p className="mb-1 capitalize">
              {key} : {userData[key]}
            </p>
          </div>
        ))}

      

      {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default UserUpdate;
