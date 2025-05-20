import React from "react";
import Button from "./Button.tsx";

const ResourceCard = ({index, ressource}) => {

    const placeholder = () => console.log('ok');

    return (
        <div>
            <h2 className="sr-only">Résumé</h2>
            <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6 font-semibold leading-6 text-gray-900">
                        <p className="text-lg">Ressource {index}</p>
                        <p className="mt-1 text-sm">NomAuteur PrénomAuteur</p>
                    </div>
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                        <p className="text-sm font-medium leading-6 text-gray-900">01/01/2001</p>
                    </div>
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <p className="text-sm leading-6 text-gray-500">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        </p>
                    </div>
                </dl>
                <div className="flex gap-4 mt-6 border-t border-gray-900/5 px-6 py-6">
                    <Button label={"Consulter"} onClick={placeholder}/>
                    <Button label={"Partager"} onClick={placeholder} color={"gray"}/>
                </div>
            </div>
        </div>
    )
}

export default ResourceCard;