import React, { useEffect, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import { SelectBox } from "../Form/SelectBox";
import { ISelectBoxOption } from "../../types/SelectBoxOption";
import api from "../../api/apiConfiguration";
import { IRole } from "../../types/Role";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const token = localStorage.getItem("token");

interface AdminRegisterProps {
  onClose: () => void;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    password: "",
    password_confirmation: "",
    code_postal: "",
    ville: "",
    role_id: "2", // par défaut administrateur
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    password: "",
    password_confirmation: "",
    code_postal: "",
    ville: "",
    role_id: "2", // par défaut administrateur
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");
  const handleSubmit = async () => {
    setMessage("");
    setError("");

    const payload = {
      ...formData,
      actif: true,
      actif: true,
    };

    try {
      await api.post("users", payload, {
      await api.post("users", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Compte créé avec succès !");
      setFormData({
        nom: "",
        prenom: "",
        pseudo: "",
        email: "",
        password: "",
        password_confirmation: "",
        code_postal: "",
        ville: "",
        role_id: "4",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte."
      );
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte."
      );
    }
  };

  const villesOptions: ISelectBoxOption[] = [
    { label: "Paris", value: "Paris" },
    { label: "Lyon", value: "Lyon" },
    { label: "Marseille", value: "Marseille" },
    { label: "Toulouse", value: "Toulouse" },
    { label: "Nice", value: "Nice" },
    { label: "Nantes", value: "Nantes" },
    { label: "Strasbourg", value: "Strasbourg" },
    { label: "Montpellier", value: "Montpellier" },
    { label: "Bordeaux", value: "Bordeaux" },
    { label: "Lille", value: "Lille" },
  ];

  // //Récupération de toutes les catégories
  const [roles, setRoles] = useState<IRole[]>([]);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IRole[]>>("roles");
    if (response?.status && response.data) {
      setRoles(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const rolesOptions: ISelectBoxOption[] = [
    ...roles.map((role) => ({
      label: role.name,
      value: String(role.id),
    })),
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-10">
        Créer un compte d'administration
      </h2>
      <form className="space-y-6">
        <FloatingInput
          type="text"
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Prénom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Pseudo"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          label="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="password"
          label="Confirmation du mot de passe"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <FloatingInput
          type="text"
          label="Code postal"
          name="code_postal"
          value={formData.code_postal}
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-500 mb-1 text-left">Ville</p>
        <SelectBox
          label=""
          name="ville"
          value={formData.ville}
          options={villesOptions}
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-500 mb-1 text-left">Rôle</p>
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

        <div className="flex justify-center gap-4">
          <Button
            label="Enregistrer"
            icon={<FaSave className="w-4 h-4 mr-2" />}
            onClick={handleSubmit}
          />
          <Button
            label="Fermer"
            icon={<MdClose size={25} />}
            onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;

