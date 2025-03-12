import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

const Section3 = ({ modifyImage, modifyText, cacheBuster, content: propContent }) => {
  const [content, setContent] = useState(propContent);
  const safeCacheBuster = cacheBuster || Date.now(); // ✅ Correction : valeur par défaut

  // Si `content` est vide (cas site statique), on le récupère depuis l'API
  useEffect(() => {
    if (!propContent) {
      fetch("/api/texts")
        .then((res) => res.json())
        .then((data) => setContent(data.section3)) // ✅ Correction : section3 et non section2
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
    <div className="w-full py-12">
      <div className="flex flex-col md:flex-row justify-center items-center relative">
        {/* Image avec icône de modification */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src={`/images/Logow.png?t=${safeCacheBuster}`} // ✅ Correction appliquée ici
            width={800}
            height={800}
            alt="Logo"
            className="w-full object-cover"
            onError={(e) => e.target.src = "/images/default.png"} // ✅ Ajout d'un fallback en cas d'erreur
          />
          {modifyImage && (
            <button
              onClick={() => modifyImage("Logow.png")}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <FiEdit size={24} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* Texte dynamique */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full py-4 text-center space-y-6">
          <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 flex items-center">
            {content.description}
            {modifyText && (
              <button onClick={() => modifyText("section3", "description")} className="ml-2">
                <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
