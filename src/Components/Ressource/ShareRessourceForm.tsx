import FloatingInput from "../Form/FloatingInput";
import { IRessource } from "../../types/Ressource";
import { FaShare } from "react-icons/fa";
import Button from "../Divers/Button";
import { IUser } from "../../types/User";
import { useState, ChangeEvent } from "react";
import { post } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRessourcePartage } from "../../types/RessourcePartage";

interface ShareRessourceFormProps {
  ressource: IRessource;
  user: IUser;
  onSubmit: (success: boolean) => void;
}

const ShareRessourceForm = (props: ShareRessourceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email_destinataire: "",
  });

  const validateForm = (value: string) => {
    const valueTrim = value.trim();
    if (!valueTrim) {
      return "L'email est requis.";
    }
    if (valueTrim.length > 5) {
      return "Le libellé ne doit pas dépasser 5 caractères.";
    }
    return "";
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "lib_ressource_categorie") {
      const errorMessage = validateForm(value);
      setError(errorMessage);
    }
  };

  const handleSubmit = async () => {
    //Validation des données
    const errorMessage = validateForm(formData.email_destinataire);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    //Enregistrement des données
    setError("");
    setLoading(true);
    const payload = {
      id: 0,
      lib_ressource_categorie: "",
    };

    const response = await post<typeof payload, ApiResponse<IRessourcePartage>>(
      "ressource_partages",
      payload
    );

    props.onSubmit(!!response?.status);
    setLoading(false);
  };

  const isFormInvalid = !!validateForm(formData.email_destinataire);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Partager la ressource privée {props.ressource.titre}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 mt-5">
        <div className="grid gap-1 mb-4 grid-cols-2">
          <div className="col-span-2">
            <FloatingInput
              type={"email"}
              label={"Email du destinataire"}
              value={formData.email_destinataire}
              name={"email_destinataire"}
              required={true}
              onChange={handleFormChange}
              error={!!error}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <Button
          label={"Partager"}
          loading={loading}
          onClick={handleSubmit}
          disabled={isFormInvalid || loading}
          icon={<FaShare className="w-4 h-4 mr-2"/>}
        ></Button>
      </div>
    </>
  );
};

export default ShareRessourceForm;
