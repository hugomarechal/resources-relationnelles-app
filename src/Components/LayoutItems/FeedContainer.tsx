import { ChangeEvent, useEffect, useState } from "react";
import ResourceCard from "../Divers/ResourceCard.tsx";
import { IRessource } from "../../types/Ressource.ts";
import { ApiResponse } from "../../api/ApiResponse.ts";
import { get } from "../../api/apiClient";
import { RxReset } from "react-icons/rx";
import Button from "../Divers/Button.tsx";
import SearchInput from "../Divers/SearchBar/SearchInput.tsx";
import SearchSelectBox from "../Divers/SearchBar/SearchSelectBox.tsx";
import { ISelectBoxOption } from "../../types/SelectBoxOption.ts";
import { IRelationType } from "../../types/RelationType.ts";
import { IRessourceCategorie } from "../../types/RessourceCategorie.ts";

const FeedContainer = () => {
  const [ressources, setRessources] = useState<IRessource[]>([]);

  const getRessources = async () => {
    const response = await get<ApiResponse<IRessource[]>>(
      "ressources" + "?valide=" + true
    );
    if (response?.status && response.data) {
      setRessources(response.data);
    }
  };

  useEffect(() => {
    getRessources();
  }, []);

  //Récupération de toutes les catégories
  const [allCategories, setCategories] = useState<IRessourceCategorie[]>([]);

  const getAllCategories = async () => {
    const response = await get<ApiResponse<IRessourceCategorie[]>>(
      "ressource_categories" + "?visible=" + true
    );
    if (response?.status && response.data) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Récupération de tous les types de relation
  const [allRelationTypes, setRelationTypes] = useState<IRelationType[]>([]);
  const getAllRelationTypes = async () => {
    const response = await get<ApiResponse<IRelationType[]>>(
      "relation_types" + "?visible=" + true
    );
    if (response?.status && response.data) {
      setRelationTypes(response.data);
    }
  };
  useEffect(() => {
    getAllRelationTypes();
  }, []);

  // Filtrer ressources
  const [searchTitreRessource, setSearchTitreRessource] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchRelationType, setSearchRelationType] = useState("");

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "search_titre") {
      setSearchTitreRessource(value);
    } else if (name === "search_ressource_categorie") {
      setSearchCategorie(value);
    } else if (name === "search_relation_type") {
      setSearchRelationType(value);
    }
  };

  const categorieOptions: ISelectBoxOption[] = [
    { label: "Toutes les catégories", value: "0" },
    ...allCategories.map((categorie) => ({
      label: categorie.lib_ressource_categorie,
      value: String(categorie.id),
    })),
  ];

  const relationTypeOptions: ISelectBoxOption[] = [
    { label: "Tous les types de relation", value: "0" },
    ...allRelationTypes.map((relationType) => ({
      label: relationType.lib_relation_type,
      value: String(relationType.id),
    })),
  ];

  const filteredRessources = ressources.filter(
    (ress) =>
      ress.titre.toLowerCase().includes(searchTitreRessource.toLowerCase()) &&
      (!searchCategorie ||
        String(ress.ressource_categorie.id) === searchCategorie) &&
      (!searchRelationType ||
        String(ress.relation_type.id) === searchRelationType)
  );
  
  const resetFilters = () => {
    setSearchTitreRessource("");
    setSearchCategorie("");
    setSearchRelationType("");
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Barre de recherche */}
        <div className="mt-2 mr-0 mb-4 ml-2 flex flex-wrap gap-2">
          <SearchInput
            placeholder="Chercher par titre"
            onChange={handleSearchChange}
            value={searchTitreRessource}
            name="search_titre"
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchCategorie}
            name="search_ressource_categorie"
            options={categorieOptions}
          />
          <SearchSelectBox
            onChange={handleSearchChange}
            value={searchRelationType}
            name="search_relation_type"
            options={relationTypeOptions}
          />
          <div className="gap-4">
            <Button
              icon={<RxReset size={25} />}
              onClick={resetFilters}
              color="gray"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRessources.map((ressource, index) => (
          <ResourceCard
            key={ressource.id || index}
            index={index}
            ressource={ressource}
          />
        ))}
      </div>
    </>
  );
};

export default FeedContainer;
