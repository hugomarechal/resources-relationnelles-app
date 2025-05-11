import { useEffect, useState } from "react";
import Button from "../Divers/Button";
import { FaPlus } from "react-icons/fa";
import Modal from "../Divers/Modal";
import Toast from "../Divers/Toast";
import RessourcesAdminList from "./RessourcesAdminList";
import RessourceForm from "./RessourceForm";
import { IRessource } from "../../types/Ressource";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { get } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRelationType } from "../../types/RelationType";

const ManageRessources = () => {
  //A enlever après car concerne l'ajout des ressources
  const user = {
    id: 1,
    nom: "HOUDAILLE",
    prenom: "Valérie",
    email: "hadriva@wanadoo.fr",
    password: "12345",
    pseudo: "ValHDL",
    code_postal: "13120",
    ville: "Gardanne",
    actif: false,
    role: {
      id: 1,
      name: "Name",
      guard_name: "guard_name",
    },
  };
  const [ressource, setRessource] = useState<IRessource>({
    id: 0,
    titre: "",
    description: "",
    nom_fichier: "",
    restreint: false,
    url: "",
    valide: false,
    created_at: "",
    user: {
      ...user,
    },
    ressource_categorie: {
      id: 0,
      lib_ressource_categorie: "",
      visible: false,
    },
    ressource_type: {
      id: 0,
      lib_ressource_type: "",
      visible: false,
    },
    relation_type: {
      id: 0,
      lib_relation_type: "",
      visible: false,
    },
  });

  //Récupération de toutes les catégories
  const [allCategorieTypes, setCategories] = useState<IRessourceCategorie[]>(
    []
  );
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

  const [modalFormVisible, setModalFormVisible] = useState(false);

  const [toastCreationMessage, setToastCreationMessage] = useState<
    string | null
  >(null);

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <h3 className="text-3xl font-bold dark:text-white mt-4 mb-5">
        Gestion des ressources
      </h3>
      <Button
        icon={<FaPlus size={20} />}
        onClick={() => {
          setRessource({
            id: 0,
            titre: "",
            description: "",
            nom_fichier: "",
            restreint: false,
            url: "",
            valide: false,
            created_at: "",
            user: { ...user },
            ressource_categorie: {
              id: 0,
              lib_ressource_categorie: "",
              visible: false,
            },
            ressource_type: {
              id: 1,
              lib_ressource_type: "Texte",
              visible: true,
            },
            relation_type: {
              id: 0,
              lib_relation_type: "",
              visible: false,
            },
          });
          setModalFormVisible(true);
        }}
      />
      <div className="mt-4">
        <RessourcesAdminList refreshRessources={refresh} user={user} />
      </div>

      {/* Modal modification */}
      {modalFormVisible && ressource && (
        <Modal
          isOpen={modalFormVisible}
          onClose={() => setModalFormVisible(false)}
          dismissable={true}
          position="center"
        >
          <RessourceForm
            ressource={ressource}
            onSubmit={(success) => {
              if (success) {
                setModalFormVisible(false);
                triggerRefresh();
              } else {
                setToastCreationMessage("Erreur lors de l'enregistrement");
              }
            }}
            user={user}
            relationTypes={allRelationTypes}
            categoriesTypes={allCategorieTypes}
          />
        </Modal>
      )}

      {/* Visibilité toast en cas d'erreur http */}
      {toastCreationMessage && (
        <Toast type="danger" text={toastCreationMessage} autoClose={true} />
      )}
    </>
  );
};

export default ManageRessources;
