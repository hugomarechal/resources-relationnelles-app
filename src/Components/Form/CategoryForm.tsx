import { ChangeEvent, useState } from "react";
import FloatingInput from "./FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import CheckBox from "./CheckBox";
import { ApiResponse } from "../../api/apiResponse";
import { RessourceCategorie } from "../../types/RessourceCategorie";
import { post } from "../../api/apiClient";

interface CategoryFormProps {
  onSubmit: () => void;
}

const CategoryForm = (props: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lib_ressource_categorie: "",
    visible: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      lib_ressource_categorie: formData.lib_ressource_categorie,
      visible: formData.visible,
    };

    const response = await post<
      typeof payload,
      ApiResponse<RessourceCategorie>
    >("ressource_categories", payload);

    if (response?.status) {
      console.log("Catégorie enregistrée :", response.data);
      props.onSubmit();
      setFormData({ lib_ressource_categorie: "", visible: false });
    } else {
      console.error("Échec de l'enregistrement");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Créer catégorie de ressource
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <FloatingInput
              type={"text"}
              label={"Libellé"}
              value={formData.lib_ressource_categorie}
              name={"lib_ressource_categorie"}
              required={true}
              onChange={handleInputChange}
            ></FloatingInput>
          </div>
          <div className="col-span-2">
            <CheckBox
              onChange={handleInputChange}
              isChecked={formData.visible}
              label="Visible"
              name={"visible"}
            />
          </div>
        </div>

        <Button
          label={"Enregistrer"}
          loading={loading}
          onClick={handleSubmit}
          disabled={!formData.lib_ressource_categorie.trim() || loading}
          icon={<FaSave className="w-4 h-4 mr-2" />}
        ></Button>
      </div>
    </>
  );
};

export default CategoryForm;
