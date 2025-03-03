import React from "react";
import Loupe from "../images/Loupe.svg"
import Image from "next/image";

const Search = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Conteneur de l'input et l'icône */}
            <div className="flex items-center space-x-2 border-b border-black">
                <Image src={Loupe} alt="Loupe" height={20} width={20} />
                <input 
                    type="search" 
                    placeholder="Rechercher sur le site.." 
                    className="bg-inherit font-inter p-2 placeholder-gray-500 text-xs focus:outline-none"
                />
            </div>
        </div>   
    )
}


export default Search