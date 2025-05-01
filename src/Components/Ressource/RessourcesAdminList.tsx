import { ChangeEvent, useEffect, useState } from "react";
import { del, get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import Button from "../Divers/Button";
import Modal from "../Divers/Modal";
import SearchInput from "../Divers/SearchInput";
import Toast from "../Divers/Toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import ConfirmModal from "../Divers/ConfirmModal";
import { IRessource } from "../../types/Ressource";
import RessourceForm from "./RessourceForm";
import { IUser } from "../../types/User";
import { IRelationType } from "../../types/RelationType";
import { IRessourceCategorie } from "../../types/RessourceCategorie";

interface RessourcesAdminListProps {
  refreshRessources: boolean;
  user: IUser;
}

const RessourcesAdminList = (props: RessourcesAdminListProps) => {
  // Liste des ressources à valider
  const [allRessources, setRessources] = useState<IRessource[]>([]);
  const [selectedRessource, setSelectedRessource] = useState<IRessource | null>(
    null
  );
  const getRessourcesToValidate = async () => {
    const response = await get<ApiResponse<IRessource[]>>("ressources"+"?valide=0");
    if (response?.status && response.data) {
      setRessources(response.data);
    }
  };

  // Supprimer une ressource
  const deleteRessource = async (id: number) => {
    const response = await del<ApiResponse<null>>(`ressources/${id}`);
    if (response?.status) {
      getRessourcesToValidate();
    } else {
      setToastMessage("Erreur lors de la suppression de la ressource");
    }
  };

  // Rechercher ressource
  const [searchTitreRessource, setSearchTitreRessource] = useState("");
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitreRessource(e.target.value);
  };
  const filteredRessources = allRessources.filter((ress) =>
    ress.titre.toLowerCase().includes(searchTitreRessource.toLowerCase())
  );

  //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);
  const getAllCategories = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };
  useEffect(() => {
    getAllCategories(true);
  }, []);

  //Récupération de tous les types de relation
  const [allRelationTypes, setRelationTypes] = useState<IRelationType[]>([]);
  const getAllRelationTypes = async (visible?: boolean) => {
    const response = await get<ApiResponse<IRelationType[]>>(
      "relation_types" + "?visible=" + visible
    );
    if (response?.status && response.data) {
      setRelationTypes(response.data);
    }
  };
  useEffect(() => {
    getAllRelationTypes(true);
  }, []);

  //Modal modification
  const [modalFormVisible, setModalFormVisible] = useState(false);

  // Modal confirmation suppression
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedRessource) {
      deleteRessource(selectedRessource.id);
    }
    setModalConfirmVisible(false);
  };

  //Mise à jour de la liste des catégories
  useEffect(() => {
    getRessourcesToValidate();
  }, [props.refreshRessources]);

  // Toast en cas d'erreur http
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Barre de recherche */}
        <div className="mt-1 mr-0 mb-4 ml-2">
          <SearchInput
            placeholder={"Chercher un titre de ressource"}
            onChange={handleSearchInputChange}
            value={searchTitreRessource}
          />
        </div>
        {/* Liste des ressources */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Créateur
              </th>
              <th scope="col" className="px-6 py-3">
                titre
              </th>
              <th scope="col" className="px-6 py-3">
                Catégorie
              </th>
              <th scope="col" className="px-6 py-3">
                Relation
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Modifier</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Supprimer</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRessources.map((ressource) => (
              <tr
                key={ressource.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.user.pseudo}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.titre}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.ressource_categorie.lib_ressource_categorie}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ressource.relation_type.lib_relation_type}
                </td>

                <td className="px-6 py-4 text-right">
                  <Button
                    icon={<MdModeEdit size={25} />}
                    label=""
                    onClick={() => {
                      if (ressource) {
                        setSelectedRessource(ressource);
                        setModalFormVisible(true);
                      }
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    icon={<MdDelete size={20} />}
                    label=""
                    onClick={() => {
                      if (ressource) {
                        setSelectedRessource(ressource);
                        setModalConfirmVisible(true);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal formulaire modification */}
      {modalFormVisible && selectedRessource && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <RessourceForm
            ressource={selectedRessource}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                getRessourcesToValidate();
              } else {
                setToastMessage("Erreur lors de l'enregistrement");
              }
            }}
            user={props.user}
            relationTypes={allRelationTypes}
            categoriesTypes={allCategories}
          />
        </Modal>
      )}

      {/* Modal confirmation suppression */}
      <ConfirmModal
        isOpen={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
        onConfirm={handleConfirmation}
      />

      {/* Visibilité toast en cas d'erreur http */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default RessourcesAdminList;
