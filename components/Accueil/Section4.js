import React from "react";
import { FiShoppingCart, FiMessageSquare, FiCreditCard } from "react-icons/fi";

const Section4 = () => {
    return (
        <div className="w-full bg-[#F5F0E6] py-10 flex flex-col items-center">
            {/* Première ligne avec deux éléments */}
            <div className="flex justify-center gap-16  text-gray-700 font-semibold text-lg md:space-x-16">
                <div className="flex flex-col items-center space-y-2 ">
                    <FiShoppingCart size={60} />
                    <p className="font-gluten text-2xl text-center">CATALOGUE EN LIGNE</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <FiMessageSquare size={60} />
                    <p className="font-gluten text-2xl text-center">EQUIPE DISPONIBLE</p>
                </div>
            </div>

            {/* Deuxième ligne avec un seul élément */}
            <div className="mt-8 md:mt-12 flex flex-col items-center space-y-2 text-gray-700 font-semibold">
                <FiCreditCard size={60} />
                <p className="font-gluten text-2xl">PAIEMENT SÉCURISÉ</p>
            </div>
        </div>
    );
};

export default Section4;
