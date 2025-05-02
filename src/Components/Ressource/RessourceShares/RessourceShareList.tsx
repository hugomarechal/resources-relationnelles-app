import { useEffect, useState } from "react";
import { MdPersonAddDisabled } from "react-icons/md";
import { IRessourcePartage } from "../../../types/RessourcePartage";
import { del, get } from "../../../api/apiClient";
import { ApiResponse } from "../../../api/ApiResponse";
import Button from "../../Divers/Button";
import ConfirmModal from "../../Divers/ConfirmModal";
import Toast from "../../Divers/Toast";

interface ShareRessourceListProps {
  refreshPartages: boolean;
  ressource_id: number;
}

const RessourceShareList = (props: ShareRessourceListProps) => {
  // Liste de tous les partages
  const [ressourcePartages, setRessourcePartages] = useState<
    IRessourcePartage[]
  >([]);
  const [selectedPartage, setSelectedPartage] =
    useState<IRessourcePartage | null>(null);

  const getRessourcePartages = async () => {
    const response = await get<ApiResponse<IRessourcePartage[]>>(
      "ressource_partages" + "?ressource_id=" + props.ressource_id
    );
    if (response?.status && response.data) {
      setRessourcePartages(response.data);
    }
  };

  //Mise à jour de la liste
  useEffect(() => {
    getRessourcePartages();
  }, [props.refreshPartages]);

  // Modal confirmation suppression
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedPartage) {
      deleteRessource(selectedPartage);
    }
    setModalConfirmVisible(false);
  };

  // Supprimer une ressource
  const deleteRessource = async (selectedPartage: IRessourcePartage) => {
    const response = await del<ApiResponse<null>>(
      `ressource_partages/${selectedPartage.id}`
    );
    if (response?.status) {
      getRessourcePartages();
    } else {
      setToastMessage("Erreur lors de la suppression du partage");
    }
  };

  // Toast en cas d'erreur http
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <>
    {ressourcePartages.length> 0 &&
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Liste des partages */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-5">
                Nom
              </th>
              <th scope="col" className="px-1 py-5">
                Prénom
              </th>
              <th scope="col" className="px-1 py-5">
                Pseudo
              </th>
              <th scope="col" className="px-1 py-5">
                Email
              </th>
              <th scope="col" className="px-1 py-5">
                <span className="sr-only">Supprimer</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {ressourcePartages.map((partage) => (
              <tr
                key={partage.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {partage.destinataire.nom}
                </td>
                <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {partage.destinataire.prenom}
                </td>
                <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {partage.destinataire.pseudo}
                </td>
                <td className="px-1 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  {partage.destinataire.email}
                </td>
                <td className="px-1 py-3 text-right">
                  <Button
                    icon={<MdPersonAddDisabled size={20} />}
                    label=""
                    onClick={() => {
                      if (partage.destinataire.id && partage.ressource.id) {
                        setSelectedPartage(partage);
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
    }

      {/* Modal confirmation suppression */}
      <ConfirmModal
        isOpen={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        message="Êtes-vous sûr de vouloir supprimer ce partage ?"
        onConfirm={handleConfirmation}
      />

      {/* Visibilité toast en cas d'erreur http */}
      {toastMessage && (
        <Toast type="danger" text={toastMessage} autoClose={true} />
      )}
    </>
  );
};

export default RessourceShareList;
