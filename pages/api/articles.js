import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3', // Ta région
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const JSON_KEY = 'data/articles.json'; // Où tu stockes ton JSON dans S3

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
      const data = JSON.parse(s3Data.Body.toString('utf-8'));
      res.status(200).json(data);
    } catch (error) {
      console.error("Erreur lecture JSON S3 :", error);
      res.status(500).json({ error: "Erreur de lecture du fichier JSON" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, price, description, image } = req.body;
      if (!name || !price || !description || !image) {
        return res.status(400).json({ error: "Données incomplètes" });
      }

      // ✅ Lecture des articles existants sur S3
      let data = [];
      try {
        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
        data = JSON.parse(s3Data.Body.toString('utf-8'));
      } catch (err) {
        console.log("Pas de fichier articles.json trouvé ou vide, création...");
      }

      const newArticle = {
        id: Date.now().toString(),
        name,
        price: `${price} €`,
        image,
        description,
      };

      data.push(newArticle);

      // ✅ Réécriture du JSON sur S3
      await s3.putObject({
        Bucket: BUCKET_NAME,
        Key: JSON_KEY,
        Body: JSON.stringify(data, null, 2),
        ContentType: 'application/json',
        ACL: 'private', // ou 'public-read' si tu veux qu'il soit public
      }).promise();

      res.status(201).json({ message: "Article ajouté avec succès", article: newArticle });
    } catch (error) {
      console.error("Erreur ajout article S3 :", error);
      res.status(500).json({ error: "Erreur lors de l'ajout de l'article" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
