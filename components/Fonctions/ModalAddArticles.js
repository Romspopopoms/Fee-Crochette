import { useState } from "react";

export default function ModalAjoutArticle({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !description || !image) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setUploading(true);

    try {
      // 🔄 Upload de l'image sur AWS S3
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Erreur lors de l'upload de l'image.");
        setUploading(false);
        return;
      }

      // 🔄 Ajout de l'article dans articles.json sur S3
      const newArticle = {
        id: Date.now().toString(),
        name,
        price: parseFloat(price), // Stockons le prix comme nombre
        description,
        image: uploadData.imageUrl, // ✅ URL S3 récupérée
      };

      const saveRes = await fetch("/api/add-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      const saveData = await saveRes.json();

      if (saveData.success) {
        // Format le prix pour l'affichage
        const formattedArticle = {
          ...saveData.article,
          price: `${saveData.article.price} €`
        };
        onSave(formattedArticle);
        onClose();
      } else {
        alert("Erreur lors de l'ajout de l'article.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("Une erreur est survenue.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">Ajouter un Article</h2>

        <input
          type="text"
          placeholder="Nom de l'article"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-md mb-2"
        />
        <input
          type="number"
          placeholder="Prix (€)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded-md mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded-md mb-2"
        />
        <input type="file" onChange={handleFileChange} className="mb-4" />

        {name || price || description || previewUrl ? (
          <div className="border-t border-gray-300 mt-4 pt-4">
            <h3 className="text-lg font-semibold mb-2">Prévisualisation</h3>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Prévisualisation"
                className="w-64 h-64 rounded-lg object-cover"
              />
            )}
            <h4 className="font-bold">{name}</h4>
            <p>{description}</p>
            <p className="text-lg font-bold">{price ? `${price} €` : ""}</p>
          </div>
        ) : null}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={uploading}
          >
            {uploading ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </div>
      </div>
    </div>
  );
}