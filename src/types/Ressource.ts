import { IRelationType } from "./RelationType";
import { IRessourceCategorie } from "./RessourceCategorie";
import { IRessourceType } from "./RessourceType";
import { IUser } from "./User";

export interface IRessource {
    id: number;
    titre: string;
    description: string;
    nom_fichier: string;
    restreint: boolean;
    url: string;
    valide: boolean;

    user: IUser;
    categorie: IRessourceCategorie;
    ressource_type: IRessourceType;
    relation_type: IRelationType;
}