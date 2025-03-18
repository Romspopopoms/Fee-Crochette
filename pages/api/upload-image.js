import AWS from "aws-sdk";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Nécessaire pour le upload avec formidable
  },
};

// ✅ Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,        // À mettre dans ton .env.local
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // À mettre dans ton .env.local
  region: 'eu-west-3' // Change la région si besoin
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erreur lors du parsing du fichier :", err);
      return res.status(500).json({ error: "Erreur lors de l'upload." });
    }

    const newImage = files.image?.[0]; // Récupérer le fichier "image"

    if (!newImage) {
      return res.status(400).json({ error: "Aucune image envoyée." });
    }

    // ✅ Lecture du fichier temporaire
    const fileContent = fs.readFileSync(newImage.filepath);

    // ✅ Création d'un nom unique pour le fichier sur S3
    const fileName = `${Date.now()}-${newImage.originalFilename}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Ex: 'mon-projet-images'
      Key: `images/${fileName}`,           // Dossier dans ton bucket
      Body: fileContent,
      ContentType: newImage.mimetype,
      ACL: 'public-read',                  // Ou 'private' si tu veux sécuriser
    };

    try {
      // ✅ Upload sur S3
      const data = await s3.upload(params).promise();

      // ✅ Réponse avec l'URL publique de l'image
      return res.status(200).json({
        success: true,
        imageUrl: data.Location, // L'URL de l'image sur S3
      });
    } catch (uploadErr) {
      console.error("Erreur lors de l'upload S3 :", uploadErr);
      return res.status(500).json({ error: "Erreur lors de l'upload sur S3." });
    }
  });
}
