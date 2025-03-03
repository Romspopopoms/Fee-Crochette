import { useState } from "react";
import Navbar from "@/components/Navbar";
import Section1 from "../components/Produits/Section1";
import Section4 from "@/components/Accueil/Section4";
import Sidebar from "@/components/Produits/Sidebar";
import products from "../data/products";

const Produit = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const resetFilters = () => {
        setFilteredProducts(products);
    };

    return (
        <div className="w-full min-h-full flex flex-col bg-[#F2F2F2]">
            <Navbar />
            <div className="flex">
                <Sidebar onFilterChange={setFilteredProducts} />
                <div className="flex-1 px-6 py-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-gluten font-bold">Nos créations</h2>
                        <button onClick={resetFilters} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Réinitialiser</button>
                    </div>
                    <Section1 products={filteredProducts} />
                </div>
            </div>
            <Section4 />
        </div>
    );
};

export default Produit;
