import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../Navbar';
export default function ProductDetails({ product }) {
  return (
    <div className="w-full min-h-full flex flex-col bg-[#F2F2F2]">
        <Navbar />
    <div className="max-w-6xl mx-auto p-6 mt-20 md:mt-40">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/Produits" className="hover:underline text-[#666666] text-2xl font-semibold afacad">Produits</Link> {'> '} 
        <span className="text-xl text-[#ffebf5] ">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Image principale */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={500}
            className="w-full object-cover"
          />
          
          {/* Galerie d'images */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${product.name} image ${index}`}
                width={100}
                height={80}
                className="w-1/3 h-32 object-cover rounded-md cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>

        {/* Infos produit */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-gluten font-medium text-title mb-2">{product.name}</h1>
          <p className="text-title text-xl font-afacad font-bold">{product.price}</p>

          <p className="mt-4 text-title text-2xl font-afacad font-normal max-w-[70%]">{product.description}</p>

          {/* Caractéristiques */}
          <div className="mt-6">
            <h3 className="text-lg text-title font-semibold font-afacad mb-2">Caractéristiques :</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li><strong>Matériaux :</strong> {product.details.materiaux}</li>
              <li><strong>Dimensions :</strong> {product.details.dimensions}</li>
              <li><strong>Détails :</strong> {product.details.détails}</li>
              <li><strong>Personnalisable :</strong> {product.details.personnalisation}</li>
            </ul>
          </div>

          {/* Bouton d'action */} 
          <div className="mt-6 flex items-center justify-center">
          <a href="/Contact" className=" mt-6 md:mt-0 bg-[#666666] text-[#f2f2f2] px-16 py-4 hover:bg-gray-900 transition font-gluten text-xl">Nous contacter</a>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
