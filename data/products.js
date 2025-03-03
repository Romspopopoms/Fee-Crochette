import Prod from "../images/Prod.webp";

const products = [
  {
    id: "foulard-etoile-hivernale",
    name: "Foulard Étoile Hivernale",
    price: "45,00 €",
    image: Prod,
    category: "textile",
    images: [Prod, Prod, Prod],
    description: "Un foulard en laine fait main, parfait pour l'hiver.",
    details: {
      materiaux: "Laine naturelle, ultra douce",
      dimensions: "200 cm x 50 cm",
      personnalisation: "Disponible en plusieurs couleurs",
    },
  },
  {
    id: "sac-fleuri-boheme",
    name: "Sac Fleuri Bohème",
    price: "60,00 €",
    image: Prod,
    category: "accessoires",
    images: [Prod, Prod, Prod],
    description: "Un sac élégant en crochet avec des motifs floraux.",
    details: {
      materiaux: "100% coton naturel",
      dimensions: "30 cm x 25 cm",
      personnalisation: "Disponible avec ou sans doublure",
    },
  },
  {
    id: "couverture-douce-reverie",
    name: "Couverture Douce Rêverie",
    price: "75,00 €",
    image: Prod,
    category: "textile",
    images: [Prod, Prod, Prod],
    description: "Une couverture douce et chaude, idéale pour les bébés.",
    details: {
      materiaux: "Coton biologique",
      dimensions: "100 cm x 80 cm",
      personnalisation: "Disponible avec broderie prénom",
    },
  },
  {
    id: "doudou-lapin",
    name: "Doudou Lapin",
    price: "35,00 €",
    image: Prod,
    category: "jouets",
    images: [Prod, Prod, Prod],
    description: "Un doudou en crochet fait main, parfait pour les enfants.",
    details: {
      materiaux: "100% coton naturel, rembourrage hypoallergénique.",
      dimensions: "Hauteur environ 20 cm.",
      personnalisation: "Disponible en plusieurs couleurs.",
    },
  },
];

export default products;
