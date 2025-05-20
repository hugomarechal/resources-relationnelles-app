import React, {useEffect, useState} from 'react';
import ResourceCard from "../Divers/ResourceCard.tsx";
import {IRessource} from "../../types/Ressource.ts";
import {ApiResponse} from "../../api/ApiResponse.ts";
import { get } from "../../api/apiClient";
import RessourceForm from "../Ressource/RessourceForm.tsx";

const FeedContainer = () => {

    const ressources = [1,2,3,4,5,6,7,8,9];
    //const [ressources, setRessources] = useState<IRessource[]>([]);
    const getRessources = async () => {
        const response = await get<ApiResponse<IRessource[]>>("ressources");
        if (response?.status && response.data) {
            setRessources(response.data);
        }
    }

    useEffect(() => {
        getRessources();
    }, []);

    return(
        <>
            <div className={"flex flex-col lg:flex-row gap-3"}>
                {
                    ressources.map((index, ressource) => (
                        <ResourceCard index={index} ressource={ressource}/>
                    ))
                }
            </div>
        </>
    )
}

export default FeedContainer;