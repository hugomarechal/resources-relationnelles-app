import { ChangeEvent, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import CheckBox from "../Form/CheckBox";
import { RessourceCategorie } from "../../types/RessourceCategorie";
import { post, put } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";

interface CategoryFormProps {
  onSubmit: (success: boolean) => void;
  ressourceCategorie: RessourceCategorie;
}

const CategoryForm = (props: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lib_ressource_categorie:
      props.ressourceCategorie?.lib_ressource_categorie || "",
    visible: props.ressourceCategorie?.visible ?? true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log({ name, value, type, checked });
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      id: props.ressourceCategorie.id,
      lib_ressource_categorie: formData.lib_ressource_categorie,
      visible: formData.visible,
    };

    let response;
    if (props.ressourceCategorie.id === 0) {
      response = await post<typeof payload, ApiResponse<RessourceCategorie>>(
        "ressource_categories",
        payload
      );
    } else {
      //Pb sur put à revoir
      response = await put<typeof payload, ApiResponse<RessourceCategorie>>(
        "ressource_categories",
        payload
      );
    }

    if (response?.status) {
      setFormData({
        lib_ressource_categorie:
          props.ressourceCategorie.lib_ressource_categorie,
        visible: props.ressourceCategorie.visible,
      });
      props.onSubmit(true);
    } else {
      console.error("Échec de l'enregistrement");
      props.onSubmit(false);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {props.ressourceCategorie.id && props.ressourceCategorie.id !== 0
            ? "Modifier"
            : "Créer"}{" "}
          catégorie de ressource
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 mt-5">
        <div className="grid gap-1 mb-4 grid-cols-2">
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
          <div className="col-span-2 mb-5">
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
