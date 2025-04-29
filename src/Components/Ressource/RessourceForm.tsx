import { ChangeEvent, useState } from "react";
import FloatingInput from "../Form/FloatingInput";
import Button from "../Divers/Button";
import { FaSave } from "react-icons/fa";
import CheckBox from "../Form/CheckBox";
import { post, put } from "../../api/apiClient";
import { ApiResponse } from "../../api/ApiResponse";
import { IRessource } from "../../types/Ressource";
import TextArea from "../Form/TextArea";
import { IUser } from "../../types/User";
import { IRelationType } from "../../types/RelationType";
import { IRessourceCategorie } from "../../types/RessourceCategorie";
import { SelectBox, SelectOption } from "../Form/SelectBox";

interface CategoryFormProps {
  onSubmit: (success: boolean) => void;
  user: IUser;
  relationTypes: IRelationType[];
  categoriesTypes: IRessourceCategorie[];
  ressource: IRessource;
}

const RessourceForm = (props: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ressourceInput = {
    id: props.ressource?.id || 0,
    titre: props.ressource?.titre || "",
    description: props.ressource?.description || "",
    nom_fichier: props.ressource?.nom_fichier || "",
    restreint: props.ressource?.restreint || false,
    url: props.ressource?.url || "",
    valide: props.ressource?.valide || false,
    user_id: props.ressource?.user.id || 0,
    ressource_categorie_id: props.ressource?.ressource_categorie.id || 0,
    ressource_type_id: props.ressource?.ressource_type.id || 1,
    relation_type_id: props.ressource?.relation_type.id || 0,
  };

  const [formData, setFormData] = useState({
    ...ressourceInput,
  });

  const categorieOptions: SelectOption[] = [
    { label: "Selectionner une catégorie", value: "0" },
    ...props.categoriesTypes.map((categorie) => ({
      label: categorie.lib_ressource_categorie,
      value: String(categorie.id),
    })),
  ];

  const relationTypesOptions: SelectOption[] = [
    { label: "Selectionner un type de relation", value: "0" },
    ...props.relationTypes.map((relation) => ({
      label: relation.lib_relation_type,
      value: String(relation.id),
    })),
  ];

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async () => {
    //Validation des données
    if (!formData.titre.trim()) {
      setError("Le titre est requis.");
      return;
    }
    if (formData.titre.length > 50) {
      setError("Le titre ne doit pas dépasser 50 caractères.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Le description est requise.");
      return;
    }
    if (formData.description.length > 1000) {
      setError("Le titre ne doit pas dépasser 1000 caractères.");
      return;
    }

    if (formData.relation_type_id === 0) {
      setError("Le type de relation est requis.");
      return;
    }

    if (formData.ressource_categorie_id === 0) {
      setError("La catégorie est requise.");
      return;
    }

    if (formData.url.trim()) {
      try {
        console.log("Validating URL:", formData.url);
        new URL(formData.url);
      } catch {
        setError("Le format d'URL n'est pas valide.");
        return;
      }
      if (formData.url.length > 255) {
        setError("L'URL ne doit pas dépasser 255 caractères.");
        return;
      }
    }

    //Enregistrement des données
    setError("");
    setLoading(true);
    const payload = {
      titre: formData.titre,
      description: formData.description,
      nom_fichier: formData.nom_fichier ?? "",
      restreint: formData.restreint,
      url: formData.url ?? "",
      valide: formData.valide,
      user_id: formData.user_id,
      ressource_categorie_id: Number(formData.ressource_categorie_id),
      ressource_type_id: formData.ressource_type_id,
      relation_type_id: Number(formData.relation_type_id),
    };

    let response;
    if (props.ressource.id === 0) {
      response = await post<typeof payload, ApiResponse<IRessource>>(
        "ressources",
        payload
      );
    } else {
      response = await put<typeof payload, ApiResponse<IRessource>>(
        `ressources/${props.ressource.id}`,
        payload
      );
    }
    props.onSubmit(!!response?.status);
    setLoading(false);
  };

  const isFormInvalid =
    !formData.titre.trim() ||
    formData.titre.trim().length > 50 ||
    !formData.description.trim() ||
    formData.description.trim().length > 1000 ||
    formData.relation_type_id === 0 ||
    formData.ressource_categorie_id === 0;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b bg-gray-600rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {props.ressource.id && props.ressource.id !== 0
            ? "Modifier"
            : "Créer"}{" "}
          ressource
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 mt-5">
        <div className="grid gap-1 mb-4 grid-cols-2">
          <div className="col-span-2">
            <SelectBox
              options={categorieOptions}
              label={"Catégorie"}
              value={String(formData.ressource_categorie_id)}
              name="ressource_categorie_id"
              onChange={handleFormChange}
              error={formData.ressource_categorie_id === 0}
              required={true}
            />
          </div>

          <div className="col-span-2">
            <SelectBox
              options={relationTypesOptions}
              label={"Type de relation"}
              value={String(formData.relation_type_id)}
              name="relation_type_id"
              onChange={handleFormChange}
              error={formData.relation_type_id === 0}
              required={true}
            />
          </div>

          <div className="col-span-2">
            <FloatingInput
              type={"text"}
              label={"Titre"}
              value={formData.titre}
              name={"titre"}
              required={true}
              onChange={handleFormChange}
              error={formData.titre === ""}
            />
          </div>

          <div className="col-span-2">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Écrire le contenu ici ..."
              label="Contenu de la ressource"
              required={true}
              maxLength={1000}
              rows={20}
              error={formData.description === ""}
            />
          </div>

          <div className="col-span-2 mt-5">
            <FloatingInput
              type={"url"}
              label={"Lien vers une url"}
              value={formData.url}
              name={"url"}
              onChange={handleFormChange}
              error={formData.url !== "" && !formData.url.startsWith("http")}
            />
          </div>

          <div className="col-span-2 mb-5">
            <CheckBox
              onChange={handleFormChange}
              isChecked={formData.restreint}
              label="Privée"
              name={"restreint"}
            />
          </div>

          {/* Afficher uniquement pour administrateur */}
          <div className="col-span-2 mb-5">
            <CheckBox
              onChange={handleFormChange}
              isChecked={formData.valide}
              label="Valide"
              name={"valide"}
            />
          </div>
          {/* Pour admin */}
        </div>

        <div>
          {error && (
            <strong id="title-error" role="alert" className="text-red-500 mt-4 mb-4">
              {error}
            </strong>
          )}
        </div>

        <div>
          <Button
            label={"Enregistrer"}
            loading={loading}
            onClick={handleSubmit}
            disabled={isFormInvalid || loading}
            icon={<FaSave className="w-4 h-4 mr-2" />}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default RessourceForm;
