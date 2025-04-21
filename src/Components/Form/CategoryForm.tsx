import { ChangeEvent, useState } from "react";
import FloatingInput from "./FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";

interface CategoryFormProps {
  onSubmit: () => void;
}

const CategoryForm = (props: CategoryFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Libellé enregistré :", inputValue);
      props.onSubmit();
      setInputValue("");
    } catch (e) {
      console.error("Erreur lors de l'enregistrement", e);
    } finally {
      setLoading(false);
    }
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
              value={inputValue}
              name={"libCategorie"}
              required={true}
              onChange={handleInputChange}
            ></FloatingInput>
          </div>
        </div>

        <Button
          label={"Enregistrer"}
          loading={loading}
          onClick={handleSubmit}
          disabled={!inputValue.trim() || loading}
          icon={<FaSave className="w-4 h-4 mr-2" />}
        ></Button>
      </div>
    </>
  );
};

export default CategoryForm;
