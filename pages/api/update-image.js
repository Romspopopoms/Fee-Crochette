import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, // Désactive le body parser de Next.js pour gérer les fichiers
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const imagesDir = path.join(process.cwd(), "public", "images"); // ✅ Stocke dans /public/images/

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

    const oldImage = fields.oldImage?.[0]; // Nom de l'ancienne image
    const newImage = files.image?.[0]; // Nouvelle image

    if (!oldImage || !newImage) {
      return res.status(400).json({ error: "Image non spécifiée." });
    }

    const oldImagePath = path.join(imagesDir, oldImage);
    const newImagePath = path.join(imagesDir, oldImage); // ✅ Remplace l’ancien fichier avec le même nom

    // ✅ Vérifier si l’ancienne image existe avant de la remplacer
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // Supprimer l'ancienne image
    }

    // ✅ Déplacer la nouvelle image à la place de l'ancienne
    fs.rename(newImage.filepath, newImagePath, (err) => {
      if (err) {
        console.error("Erreur lors du renommage :", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour." });
      }

      res.status(200).json({ message: "Image mise à jour avec succès." });
    });
  });
}
