import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { RessourceCategorie } from "../../types/RessourceCategorie";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import CategoryForm from "./CategoryForm";

const CategoriesList = () => {
  const [categories, setCategories] = useState<RessourceCategorie[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<RessourceCategorie | null>(null);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<RessourceCategorie[]>>("ressource_categories");
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Libellé</th>
              <th scope="col" className="px-6 py-3">Actif</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {cat.lib_ressource_categorie}
                </td>
                <td className="px-6 py-4">
                  {!cat.visible ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <RxCrossCircled className="text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    icon={<CiEdit size={20} />}
                    label=""
                    onClick={() => {
                      setSelectedCategorie(cat);
                      setVisible(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible && selectedCategorie && (
        <Modal
          isOpen={visible}
          onClose={() => setVisible(false)}
          dismissable={true}
          position="center"
        >
          <CategoryForm
            ressourceCategorie={selectedCategorie}
            onSubmit={(success) => {
              setVisible(false);
              if (success) {
                getAllCategories();
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoriesList;
