import React from "react";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import Link from "next/link";

const Section1 = () => {
  return (
    <div className="w-full mt-20 md:mt-40">
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image src={Logo} width={800} height={800} alt="logo" className="w-full object-cover" />
        </div>

        {/* Texte */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full py-4 text-center space-4 md:space-y-6">
          <h1 className="text-3xl font-gluten text-title">LA FÉE CROCHETTE</h1>
          <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 ">
            Plongez dans un univers où la créativité et la passion du fait main prennent vie. Que vous soyez à la recherche d’accessoires uniques, de décorations pleines de charme, ou de cadeaux personnalisés, notre boutique est un véritable écrin de merveilles.
          </p>
          <Link href="/Produits" className=" mt-6 md:mt-0 bg-[#666666] text-[#f2f2f2] px-8 py-4 hover:bg-gray-900 transition font-gluten text-xl">Découvrir</Link>
        </div>

      </div>
        {/* Texte 2*/}

      <div className="flex flex-col justify-center items-center w-full h-full py-16 text-center space-4 md:space-y-6 bg-[#ffebf5]">
          <h1 className="text-3xl font-gluten text-title">SÉLECTION</h1>
          <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 ">
          Découvrez une collection unique, soigneusement choisie pour vous émerveiller. Entre accessoires délicatement confectionnés, décorations poétiques et pièces personnalisées, chaque création raconte une histoire.
          </p>
          <a href="/Produits" className=" mt-6 md:mt-0 bg-[#666666] text-[#f2f2f2] px-8 py-4 hover:bg-gray-900 transition font-gluten text-xl">Découvrir</a>
        </div>

    </div>
  );
};

export default Section1;
