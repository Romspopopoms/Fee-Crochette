import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3', // adapte si besoin
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const JSON_KEY = 'data/articles.json'; // Le chemin de ton JSON dans S3

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { id, name, price, description, image } = req.body;

    if (!id || !name || !price || !description || !image) {
      return res.status(400).json({ error: "Données incomplètes." });
    }

    // 🔥 Lire le JSON sur S3 ou initialiser une liste vide
    let articles = [];
    try {
      const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
      articles = JSON.parse(s3Data.Body.toString('utf-8'));
    } catch (err) {
      console.log("Pas de fichier ou vide, on crée un nouveau tableau.");
    }

    // ✅ Ajouter le nouvel article
    const newArticle = { id, name, price, description, image };
    articles.push(newArticle);

    // ✅ Réécrire dans S3
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: JSON_KEY,
      Body: JSON.stringify(articles, null, 2),
      ContentType: 'application/json',
      ACL: 'private', // ou 'public-read' si tu veux rendre le JSON accessible
    }).promise();

    res.status(200).json({ success: true, message: "Article ajouté avec succès", article: newArticle });
  } catch (error) {
    console.error("Erreur ajout article S3 :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'article." });
  }
}
