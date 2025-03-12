import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const filePath = path.join(process.cwd(), "public", "articles.json");

  try {
    const { id, name, price, description, image } = req.body;

    if (!id || !name || !price || !description || !image) {
      return res.status(400).json({ error: "Données incomplètes." });
    }

    // 🔥 Lire le fichier articles.json (ou initialiser une liste vide)
    let articles = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      articles = JSON.parse(fileData);
    }

    // ✅ Ajouter le nouvel article
    const newArticle = { id, name, price, description, image };
    articles.push(newArticle);

    // ✅ Écrire dans articles.json
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

    res.status(200).json({ success: true, message: "Article ajouté avec succès", article: newArticle });
  } catch (error) {
    console.error("Erreur ajout article :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'article." });
  }
}
