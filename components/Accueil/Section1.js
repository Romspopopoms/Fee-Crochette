import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const Section1 = ({ modifyImage, modifyText, cacheBuster, content: propContent }) => {
  const [content, setContent] = useState(propContent);
  const safeCacheBuster = cacheBuster || Date.now(); // ✅ Ajout d'une valeur par défaut

  // Si `content` est vide (cas site statique), on le récupère depuis l'API
  useEffect(() => {
    if (!propContent) {
      fetch("/api/texts")
        .then((res) => res.json())
        .then((data) => setContent(data.section1))
        .catch((err) => console.error("Erreur chargement du texte :", err));
    }
  }, [propContent]);

  if (!content) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 md:mt-40">
      <div className="flex flex-col md:flex-row justify-center items-center relative">
        {/* Image avec icône de modification */}
        <div className="w-full md:w-1/2 relative">
          <Image 
            src={`/images/Logo.png?t=${safeCacheBuster}`} // ✅ Correction : valeur par défaut
            width={800} 
            height={800} 
            alt="logo" 
            className="w-full object-cover"
          />
          {modifyImage && (
            <button
              onClick={() => modifyImage("Logo.png")}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <FiEdit size={24} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* Texte dynamique */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full py-4 text-center space-y-6">
          <h1 className="text-3xl font-gluten text-title flex items-center">
            {content.title}
            {modifyText && (
              <button onClick={() => modifyText("section1", "title")} className="ml-2">
                <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
              </button>
            )}
          </h1>
          <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 flex items-center">
            {content.description}
            {modifyText && (
              <button onClick={() => modifyText("section1", "description")} className="ml-2">
                <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Sous-section avec texte dynamique */}
      <div className="flex flex-col justify-center items-center w-full h-full py-16 text-center space-y-6 bg-[#ffebf5]">
        <h1 className="text-3xl font-gluten text-title flex items-center">
          {content.subtitle}
          {modifyText && (
            <button onClick={() => modifyText("section1", "subtitle")} className="ml-2">
              <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
            </button>
          )}
        </h1>
        <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 flex items-center">
          {content.subtitle_description}
          {modifyText && (
            <button onClick={() => modifyText("section1", "subtitle_description")} className="ml-2">
              <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
            </button>
          )}
        </p>
        <Link href="/Produits"
           className="mt-6 md:mt-0 bg-[#666666] text-[#f2f2f2] px-8 py-4 hover:bg-gray-900 transition font-gluten text-xl">
            Découvrir
        </Link>
      </div>
    </div>
  );
};

export default Section1;
