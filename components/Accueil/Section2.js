import React from "react";
import Image from "next/image";
import Logo from "@/images/Logo.png";


const Section2 = () => {
    return (
        <div className="w-full flex flex-wrap items-center justify-center bg-[#fcd7eb] py-8 px-4">
            <div className=" w-full md:w-1/4 p-2 flex flex-col items-center">
                <div className="w-full relative">
                    <Image 
                        src={Logo} 
                        alt="Produit 1"
                        layout="responsive" 
                        width={1} 
                        height={1} 
                        className="object-cover w-full"
                    />
                </div>
                <h2 className="text-center mt-2 font-afacad text-[#333333] text-2xl font-bold">Foulard Etoile Hivernale</h2>
                <p className="text-center font-afacad text-[#333333] text-xl font-semibold">45,00 €</p>
            </div>

            <div className="w-1/4 p-2 md:flex flex-col items-center hidden">
                <div className="w-full relative">
                    <Image 
                        src={Logo} 
                        alt="Produit 2"
                        layout="responsive" 
                        width={1} 
                        height={1} 
                        className="object-cover w-full"
                    />
                </div>
                <h2 className="text-center mt-2 font-afacad text-[#333333] text-2xl font-bold">Foulard Étoile Printanière</h2>
                <p className="text-center font-afacad text-[#333333] text-xl font-semibold">50,00 €</p>
            </div>

            <div className="w-1/4 p-2 md:flex flex-col items-center hidden">
                <div className="w-full relative">
                    <Image 
                        src={Logo} 
                        alt="Produit 3"
                        layout="responsive" 
                        width={1} 
                        height={1} 
                        className="object-cover w-full"
                    />
                </div>
                <h2 className="text-center mt-2 font-afacad text-[#333333] text-2xl font-bold">Foulard Brise d'Été</h2>
                <p className="text-center font-afacad text-[#333333] text-xl font-semibold">55,00 €</p>
            </div>

            <div className="w-1/4 p-2 md:flex flex-col items-center hidden">
                <div className="w-full relative">
                    <Image 
                        src={Logo} 
                        alt="Produit 4"
                        layout="responsive" 
                        width={1} 
                        height={1} 
                        className="object-cover w-full"
                    />
                </div>
                <h2 className="text-center mt-2 font-afacad text-[#333333] text-2xl font-bold">Foulard Neige d’Hiver</h2>
                <p className="text-center font-afacad text-[#333333] text-xl font-semibold">60,00 €</p>
            </div>
            <a href="/Produits" className="font-bold font-gluten text-[#666666] text-2xl mt-8">TOUT AFFICHER</a>
        </div>
    );
};

export default Section2;
