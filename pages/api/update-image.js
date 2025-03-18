import AWS from "aws-sdk";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Nécessaire pour gérer les fichiers
  },
};

// ✅ Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3', // Adapte à ta région
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

    const oldImageKey = fields.oldImage?.[0]; // Clé S3 de l'ancienne image
    const newImage = files.image?.[0];

    if (!oldImageKey || !newImage) {
      return res.status(400).json({ error: "Image non spécifiée." });
    }

    // ✅ Lecture de la nouvelle image
    const fileContent = fs.readFileSync(newImage.filepath);
    const newFileName = `${Date.now()}-${newImage.originalFilename}`;
    const newS3Key = `images/${newFileName}`;

    try {
      // ✅ Supprimer l'ancienne image de S3
      await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: oldImageKey, // Ex: "images/nomAncienneImage.png"
      }).promise();

      // ✅ Uploader la nouvelle image
      const uploadResult = await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newS3Key,
        Body: fileContent,
        ContentType: newImage.mimetype,
      }).promise();

      // ✅ Retourner l'URL de la nouvelle image
      return res.status(200).json({
        message: "Image mise à jour avec succès.",
        imageUrl: uploadResult.Location,
        newS3Key, // Tu peux stocker cette clé en base pour les prochains remplacements
      });
    } catch (error) {
      console.error("Erreur AWS S3 :", error);
      return res.status(500).json({ error: "Erreur lors de la mise à jour sur S3." });
    }
  });
}
