import { useRouter } from 'next/router';
import products from '../../data/products'; // Import des données centralisées
import ProductDetails from '../../components/Produits/ProductDetails';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Produit introuvable.</p>;
  }

  return <ProductDetails product={product} />;
}
