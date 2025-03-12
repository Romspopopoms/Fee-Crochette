import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Méthode non autorisée" });

  const filePath = path.join(process.cwd(), "public", "content.json");

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur de lecture du fichier JSON :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du contenu." });
  }
}
