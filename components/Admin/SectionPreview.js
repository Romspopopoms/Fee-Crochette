import Image from "next/image";
import { FiEdit } from "react-icons/fi";

export default function SectionPreview({ section, images, onEdit }) {
  return (
    <div className="border-4 border-dashed border-gray-500 p-4 rounded-lg w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-center">{section.name}</h2>

      <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="relative group border border-gray-300 p-2 rounded-md">
              <Image
                src={img.image_url}
                alt="Aperçu"
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
              
              {/* Icône de modification */}
              <button
                onClick={() => onEdit(img)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200 transition"
              >
                <FiEdit size={20} className="text-gray-700" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2 md:col-span-3">
            Aucune image disponible
          </p>
        )}
      </div>
    </div>
  );
}
