import Link from "next/link";
import Image from "next/image";

export default function ArticlePreview({ product }) {
  return (
    <Link href={`/product/${product.id}`} passHref>
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
  );
}
