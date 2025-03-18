import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3', // adapte à ta région
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const JSON_KEY = 'data/articles.json'; // Le chemin de ton JSON dans S3

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID d'article non fourni" });
    }

    // Lire le fichier JSON actuel
    let articles = [];
    try {
      const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
      articles = JSON.parse(s3Data.Body.toString('utf-8'));
    } catch (err) {
      console.error("Erreur lecture articles S3:", err);
      return res.status(500).json({ error: "Erreur lors de la lecture des articles" });
    }

    // Filtrer pour retirer l'article à supprimer
    const articleToDelete = articles.find(article => article.id === id);
    if (!articleToDelete) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    // Supprimer l'image associée à l'article si elle existe
    if (articleToDelete.image) {
      try {
        // Extraction du nom de fichier de l'URL S3
        const imageKey = articleToDelete.image.split('/').pop();
        if (imageKey) {
          await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: `images/${imageKey}`,
          }).promise();
          console.log("Image supprimée:", imageKey);
        }
      } catch (imgErr) {
        console.error("Erreur suppression image:", imgErr);
        // On continue même si l'image ne peut pas être supprimée
      }
    }

    // Supprimer l'article de la liste
    const updatedArticles = articles.filter(article => article.id !== id);

    // Mettre à jour le fichier JSON
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: JSON_KEY,
      Body: JSON.stringify(updatedArticles, null, 2),
      ContentType: 'application/json',
      ACL: 'private',
    }).promise();

    res.status(200).json({ success: true, message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression article:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'article" });
  }
}