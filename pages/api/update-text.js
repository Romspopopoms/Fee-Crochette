import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const filePath = path.join(process.cwd(), "public", "content.json");

  try {
    // ✅ Ajout de logs pour voir ce qui est reçu
    console.log("🔹 Données reçues :", req.body);

    const { section, keys, value } = req.body;

    if (!section || !keys || value === undefined) {
      console.error("❌ Données incomplètes :", { section, keys, value });
      return res.status(400).json({ error: "Données incomplètes" });
    }

    // 🔥 Lire le fichier JSON
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!data[section]) {
      console.error(`❌ Section '${section}' introuvable`);
      return res.status(404).json({ error: `Section '${section}' introuvable` });
    }

    // 🔥 Vérifier que `keys` est bien sous forme de tableau
    const keysArray = Array.isArray(keys) ? keys.filter((key) => key !== null && key !== undefined) : keys.split(".");

    console.log("🔹 Navigation dans les clés :", keysArray);

    let target = data[section];

    for (let i = 0; i < keysArray.length - 1; i++) {
      let key = keysArray[i];

      // Convertir les index en nombres (ex : si tableau)
      if (!isNaN(key)) {
        key = parseInt(key, 10);
      }

      if (!target[key]) {
        console.error(`❌ Clé '${key}' introuvable`);
        return res.status(404).json({ error: `Clé introuvable: ${key}` });
      }

      target = target[key];
    }

    // ✅ Modifier la valeur finale
    let lastKey = keysArray[keysArray.length - 1];

    if (!isNaN(lastKey)) {
      lastKey = parseInt(lastKey, 10);
    }

    // ✅ Vérifier si c'est un prix et ajouter "€" automatiquement
    if (lastKey === "price") {
      const numericValue = value.replace(/[^\d,.]/g, ""); // Supprime tout sauf chiffres et virgules
      target[lastKey] = `${numericValue} €`;
    } else {
      target[lastKey] = value;
    }

    // ✅ Écrire les modifications dans le fichier JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log("✅ Mise à jour réussie :", { section, lastKey, newValue: target[lastKey] });

    res.status(200).json({ message: "Texte mis à jour avec succès" });
  } catch (error) {
    console.error("❌ Erreur mise à jour texte :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du texte" });
  }
}
