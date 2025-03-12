import Link from 'next/link';
import Image from 'next/image';

export default function Section1({ products = [] }) {
  // Vérifier si `products` est bien un tableau avant d'essayer de le parcourir
  if (!Array.isArray(products)) {
    console.error("La variable 'products' n'est pas un tableau :", products);
    return (
      <div className="w-full p-4">
        <p className="text-center text-red-500">
          Erreur : Les produits ne sont pas au format attendu.
        </p>
      </div>
    );
  }

  // Si le tableau est vide, afficher un message indiquant qu'il n'y a pas de produits
  if (products.length === 0) {
    return (
      <div className="w-full p-4">
        <p className="text-center text-gray-500">Aucun produit disponible</p>
      </div>
    );
  }

  // Si le tableau contient des produits, afficher la liste
  return (
    <div className="w-full p-4 mt-20">
      <h2 className="text-3xl font-gluten font-bold mb-6 text-center">Nos créations</h2>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {products.map((product) => {
          // Vérifier si les clés importantes existent avant de les utiliser
          const { id, name, price, image } = product;

          if (!id || !name || !price || !image) {
            console.warn("Produit avec des informations manquantes :", product);
            return null;
          }

          return (
            <Link key={id} href={`/product/${id}`} passHref>
              <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image
                  src={image}
                  alt={name}
                  width={192}
                  height={192}
                  className="w-64 h-64 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2 text-center text-[#333333]">{name}</h3>
                <p className="text-[#333333] text-center font-afacad font-bold">{price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
