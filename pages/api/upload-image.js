import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Désactive le body parser pour gérer les fichiers
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const imagesDir = path.join(process.cwd(), "public", "images");

  // ✅ Vérifier que le dossier public/images existe
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const form = new IncomingForm({ keepExtensions: true, uploadDir: imagesDir });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur lors du parsing du fichier :", err);
      return res.status(500).json({ error: "Erreur lors de l'upload." });
    }

    const newImage = files.image?.[0]; // Nouvelle image

    if (!newImage) {
      return res.status(400).json({ error: "Aucune image envoyée." });
    }

    // ✅ Générer un nouveau nom de fichier
    const newFileName = `${Date.now()}-${newImage.originalFilename}`;
    const newImagePath = path.join(imagesDir, newFileName);

    // ✅ Déplacer l’image uploadée dans `/public/images/`
    fs.rename(newImage.filepath, newImagePath, (err) => {
      if (err) {
        console.error("Erreur lors du déplacement :", err);
        return res.status(500).json({ error: "Erreur lors de l'upload de l'image." });
      }

      res.status(200).json({ success: true, imageUrl: `/images/${newFileName}` });
    });
  });
}
