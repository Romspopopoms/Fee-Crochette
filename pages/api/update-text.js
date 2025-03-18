import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3', // adapte à ta région
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const JSON_KEY = 'data/texts.json'; // Le chemin des textes dans S3

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Lire le fichier JSON des textes
      const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
      const texts = JSON.parse(s3Data.Body.toString('utf-8'));
      res.status(200).json(texts);
    } catch (error) {
      // Si le fichier n'existe pas encore, on renvoie un objet vide
      if (error.code === 'NoSuchKey') {
        res.status(200).json({});
      } else {
        console.error("Erreur lecture textes:", error);
        res.status(500).json({ error: "Erreur lors de la lecture des textes" });
      }
    }
  } else if (req.method === "POST") {
    try {
      const { section, keys, value } = req.body;
      
      if (!section || !keys || value === undefined) {
        return res.status(400).json({ error: "Données incomplètes" });
      }

      // Lire le fichier JSON actuel
      let texts = {};
      try {
        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: JSON_KEY }).promise();
        texts = JSON.parse(s3Data.Body.toString('utf-8'));
      } catch (err) {
        if (err.code !== 'NoSuchKey') {
          console.error("Erreur lecture textes:", err);
        }
        // Si le fichier n'existe pas, on crée un nouvel objet
      }

      // S'assurer que la section existe
      if (!texts[section]) {
        texts[section] = {};
      }

      // Mettre à jour la valeur en suivant le chemin des clés
      let current = texts[section];
      const keyArray = Array.isArray(keys) ? keys : keys.split('.');

      for (let i = 0; i < keyArray.length - 1; i++) {
        const key = keyArray[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      current[keyArray[keyArray.length - 1]] = value;

      // Sauvegarder les textes mis à jour
      await s3.putObject({
        Bucket: BUCKET_NAME,
        Key: JSON_KEY,
        Body: JSON.stringify(texts, null, 2),
        ContentType: 'application/json',
        ACL: 'private',
      }).promise();

      res.status(200).json({ success: true, message: "Texte mis à jour avec succès" });
    } catch (error) {
      console.error("Erreur mise à jour texte:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du texte" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}