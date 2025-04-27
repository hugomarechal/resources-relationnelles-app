import { ChangeEvent, useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import CategoryForm from "./CategoryForm";
import SearchInput from "../Divers/SearchInput";
import Toast from "../Divers/Toast";

const CategoriesList = () => {
  // Tableau de catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);
  const [selectedCategorie, setSelectedCategorie] =
    useState<IRessourceCategorie | null>(null);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories"
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Barre de recherche
  const [searchLibCategorie, setsearchLibCategorie] = useState("");

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchLibCategorie(e.target.value);
  };

  const filteredCategories = allCategories.filter((cat) =>
    cat.lib_ressource_categorie
      .toLowerCase()
      .includes(searchLibCategorie.toLowerCase())
  );

  //Modal création/modification
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        {/* Barre de recherche */}
        <div className="mt-2 mr-0 mb-4 ml-2">
          <SearchInput
            placeholder={"Chercher une catégorie"}
            onChange={handleSearchInputChange}
            value={searchLibCategorie}
          />
        </div>
        {/* Liste des catégories */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Libellé
              </th>
              <th scope="col" className="px-6 py-3">
                Actif
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((categorie) => (
              <tr
                key={categorie.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {categorie.lib_ressource_categorie}
                </td>
                <td className="px-6 py-4">
                  {!categorie.visible ? (
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
                      if (categorie) {
                        setSelectedCategorie(categorie);
                        setVisible(true);
                      }
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
              if (success) {
                setVisible(false);
                getAllCategories();
              } else {
                setToastMessage("Erreur lors de l'enregistrement"); // ✅
              }
            }}
          />
        </Modal>
      )}

      {toastMessage && <Toast type="danger" text={toastMessage} />}
    </>
  );
};

export default CategoriesList;
