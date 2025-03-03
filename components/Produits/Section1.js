import Link from 'next/link';
import Image from 'next/image';
import products from '../../data/products'; // Import des données centralisées

export default function ProductSection() {
  return (
    <div className="w-full p-4 mt-20 md:mt-40">
      <h2 className="text-3xl font-gluten font-bold mb-6 text-center">Nos créations</h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={192}
                className="w-full h-1/2 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 text-center text-[#333333]">{product.name}</h3>
              <p className="text-[#333333] text-center font-afacad font-bold">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
