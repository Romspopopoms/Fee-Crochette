import { useState } from "react";
import products from "../../data/products";

export default function CategoryFilter({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="w-full max-w-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Filtrer par catégorie</h3>
      <ul className="bg-white border border-gray-300 text-black rounded-md shadow-lg p-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedCategory === category ? "bg-pink-500 text-white" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}