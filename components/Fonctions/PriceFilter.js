import { useState } from "react";

export default function PriceFilter({ onPriceChange }) {
  const [priceRange, setPriceRange] = useState([10, 200]);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([10, value]);
    onPriceChange([10, value]);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Filtrer par prix</h3>
      <label className="block text-sm text-gray-700">€ {priceRange[0]} - {priceRange[1]}</label>
      <input
        type="range"
        min="10"
        max="200"
        value={priceRange[1]}
        onChange={handlePriceChange}
        className="w-full cursor-pointer mt-2"
      />
    </div>
  );
}