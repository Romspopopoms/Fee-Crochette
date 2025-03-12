import { useState } from "react";
import PriceFilter from "@/components/Fonctions/PriceFilter";

export default function Sidebar({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([10, 200]);

  const handleFilterChange = () => {
    onFilterChange({ search: searchTerm, category: selectedCategory, price: priceRange });
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col min-h-screen mt-20 md:mt-28">
      <h2 className="text-xl font-bold mb-4">Filtres</h2>
      
        

      {/* Filtre par prix */}
      <PriceFilter onPriceChange={(range) => {
        setPriceRange(range);
        handleFilterChange();
      }} />
    </div>
  );
}