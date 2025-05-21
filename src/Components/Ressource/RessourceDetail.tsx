import { formatStringDate } from "../../services/utils.ts";
import { IRessource } from "../../types/Ressource.ts";
import { FaLock, FaUnlock } from "react-icons/fa";
import Button from "../Divers/Button.tsx";
import { RiUserShared2Fill } from "react-icons/ri";

interface RessourceDetailProps {
  ressource: IRessource;
}

const RessourceDetail = ({ ressource }: RessourceDetailProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 bg-blue-100 px-4 py-2 rounded-md inline-block shadow-sm">
        {ressource.titre}
      </h2>

      <div className="text-sm text-gray-500 mt-5">
        <p>Ajouté le : {formatStringDate(ressource.created_at)}</p>
        <p>Par {ressource.user?.pseudo}</p>
      </div>

      <div className="text-sm mt-5">
        <p>
          Catégorie : {ressource.ressource_categorie?.lib_ressource_categorie}
        </p>
        <p>Type de relation : {ressource.ressource_type?.lib_ressource_type}</p>
        <div className="flex justify-center items-center gap-1 mt-2 text-sm">
          <span>Ressource </span>
          {ressource.restreint ? (
            <>
              <span>privée</span>
              <FaLock className="text-red-500" />
            </>
          ) : (
            <>
              <span>publique</span>
              <FaUnlock className="text-green-500" />
            </>
          )}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-600 whitespace-pre-line">
          {ressource.description}
        </p>
      </div>

      {ressource.url && (
        <div className="mt-5">
          <a
            href={ressource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            {ressource.url}
          </a>
        </div>
      )}

      {ressource.restreint ? (
        <div className="mt-10">
          <Button
            onClick={() => console.log("")}
            label="Partager"
            icon={<RiUserShared2Fill size={20} />}
          />
        </div>
      ) : null}
    </div>
  );
};

export default RessourceDetail;
