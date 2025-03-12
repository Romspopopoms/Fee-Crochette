import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiMessageSquare, FiCreditCard } from "react-icons/fi";

const iconsMap = {
  FiShoppingCart,
  FiMessageSquare,
  FiCreditCard,
};

const Section4 = ({ content: propContent }) => {
  const [content, setContent] = useState(propContent);

  // Si `content` est vide (cas site statique), on le récupère depuis l'API
  useEffect(() => {
    if (!propContent) {
      fetch("/api/texts")
        .then((res) => res.json())
        .then((data) => setContent(data.section4))
        .catch((err) => console.error("Erreur chargement des fonctionnalités :", err));
    }
  }, [propContent]);

  if (!content || !content.features) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F0E6] py-10 flex flex-col items-center">
      {/* Première ligne avec deux éléments */}
      <div className="flex justify-center gap-16 text-gray-700 font-semibold text-lg md:space-x-16">
        {content.features.slice(0, 2).map((feature, index) => {
          const IconComponent = iconsMap[feature.icon] || FiShoppingCart;
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <IconComponent size={60} />
              <p className="font-gluten text-2xl text-center">{feature.text}</p>
            </div>
          );
        })}
      </div>

      {/* Deuxième ligne avec un seul élément */}
      {content.features.length > 2 && (
        <div className="mt-8 md:mt-12 flex flex-col items-center space-y-2 text-gray-700 font-semibold">
          {(() => {
            const IconComponent = iconsMap[content.features[2].icon] || FiShoppingCart;
            return <IconComponent size={60} />;
          })()}
          <p className="font-gluten text-2xl">{content.features[2].text}</p>
        </div>
      )}
    </div>
  );
};

export default Section4;
