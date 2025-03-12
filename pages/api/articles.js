import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "articles.json");

export default function handler(req, res) {
    if (req.method === "GET") {
        try {
          const rawData = fs.readFileSync(filePath, "utf8");
          const data = JSON.parse(rawData);
          console.log("Données après lecture :", data);
          res.status(200).json(data);
        } catch (error) {
          console.error("Erreur de lecture du fichier JSON :", error);
          res.status(500).json({ error: "Erreur de lecture du fichier JSON" });
        }
      }
      
  else if (req.method === "POST") {
    try {
      const { name, price, description, image } = req.body;
      if (!name || !price || !description || !image) {
        return res.status(400).json({ error: "Données incomplètes" });
      }
      
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const newArticle = {
        id: Date.now().toString(),
        name,
        price: `${price} €`,
        image,
        description
      };
      
      data.push(newArticle);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      res.status(201).json({ message: "Article ajouté avec succès", article: newArticle });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'ajout de l'article" });
    }
  } 
  else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
