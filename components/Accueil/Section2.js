import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const Section2 = ({ modifyImage, modifyText, cacheBuster, content: propContent }) => {
  const [content, setContent] = useState(propContent);
  const safeCacheBuster = cacheBuster || Date.now(); // ✅ Ajout d'une valeur par défaut

  // 🟢 Mise à jour du state lorsque `propContent` change (synchro avec l'admin)
  useEffect(() => {
    if (propContent) {
      setContent(propContent);
    } else {
      fetch("/api/texts")
        .then((res) => res.json())
        .then((data) => setContent(data.section2))
        .catch((err) => console.error("Erreur chargement des produits :", err));
    }
  }, [propContent]);

  if (!content || !content.products) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-[#fcd7eb] py-8 px-4">
      <div className="flex flex-wrap justify-center gap-6">
        {content.products.map((product, index) => (
          <div key={index} className="w-40 flex flex-col items-center">
            <div className="w-40 h-40 relative flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-md">
              <Image 
                src={`/images/Produit${index + 1}.png?t=${safeCacheBuster}`} 
                alt={product.name}
                width={160}
                height={160} 
                className="object-cover w-full h-full"
                onError={(e) => e.target.src = "/images/default.png"} // ✅ Fallback en cas d'image manquante
              />
              {modifyImage && (
                <button
                  onClick={() => modifyImage(`Produit${index + 1}.png`)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                >
                  <FiEdit size={20} className="text-gray-700" />
                </button>
              )}
            </div>
            
            {/* ✅ Modification du titre du produit */}
            <h2 className="text-center mt-2 font-afacad text-[#333333] text-2xl font-bold flex items-center">
              {product.name}
              {modifyText && (
                <button onClick={() => modifyText("section2", ["products", index, "name"])} className="ml-2">
                  <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
                </button>
              )}
            </h2>

            {/* ✅ Modification du prix */}
            <p className="text-center font-afacad text-[#333333] text-xl font-semibold flex items-center">
              {product.price}
              {modifyText && (
                <button onClick={() => modifyText("section2", ["products", index, "price"])} className="ml-2">
                  <FiEdit size={20} className="text-gray-600 hover:text-gray-900 transition" />
                </button>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
