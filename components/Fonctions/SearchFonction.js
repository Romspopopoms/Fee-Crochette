import { useState } from "react";
import { useRouter } from "next/router";
import products from "../../data/products";

export default function SearchDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.length > 1) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
      setFilteredResults(results.slice(0, 3)); // Limiter à 3 résultats
    } else {
      setFilteredResults([]);
    }
  };

  const handleSelectProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
      />
      {filteredResults.length > 0 && (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 text-black rounded-md shadow-lg overflow-hidden">
          {filteredResults.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}