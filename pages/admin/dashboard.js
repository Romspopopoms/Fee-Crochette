import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ModalAjoutArticle from "../../components/Fonctions/ModalAddArticles";

// Sections dynamiques pour la page d'accueil
const sections = {
  section1: dynamic(() => import("../../components/Accueil/Section1")),
  section2: dynamic(() => import("../../components/Accueil/Section2")),
  section3: dynamic(() => import("../../components/Accueil/Section3")),
};

// Section des articles
const Section1Articles = dynamic(() => import("../../components/Produits/Section1"));

// Modal pour éditer le texte
const TextEditModal = ({ isOpen, onClose, text, onSave }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Modifier le texte</h2>
        <textarea 
          className="w-full h-40 p-2 border border-gray-300 rounded mb-4" 
          value={text.value}
          onChange={(e) => onSave(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => onClose(false)} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button 
            onClick={() => onClose(true)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal pour éditer l'image
const ImageEditModal = ({ isOpen, onClose, previewImage, onImageChange, onSave }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Modifier l'image</h2>
        
        <div className="mb-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={onImageChange}
            className="mb-2"
          />
          
          {previewImage && (
            <div className="mt-4 border border-gray-300 rounded p-2">
              <img src={previewImage} alt="Prévisualisation" className="w-full h-auto" />
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => onClose(false)} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button 
            onClick={() => {
              onSave();
              onClose(true);
            }} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [view, setView] = useState("home");
  const [selectedSection, setSelectedSection] = useState("section1");
  const [sectionKey, setSectionKey] = useState(Date.now());
  const [content, setContent] = useState(null);
  const [articles, setArticles] = useState([]);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [newText, setNewText] = useState("");
  const [showTextModal, setShowTextModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [cacheBuster, setCacheBuster] = useState(Date.now());
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") {
      router.push("/admin/login");
    }
  }, []);

  // Chargement des textes depuis S3
  useEffect(() => {
    if (view === "home") {
      fetch("/api/texts")
        .then((res) => res.json())
        .then((data) => setContent(data))
        .catch((err) => console.error("Erreur chargement texte depuis S3:", err));
    }
  }, [view, cacheBuster]);

  // Chargement des articles depuis S3
  useEffect(() => {
    if (view === "articles") {
      fetch("/api/articles")
        .then((res) => res.json())
        .then((data) => {
          // Formatage des prix pour l'affichage si nécessaire
          const formattedData = data.map(article => ({
            ...article,
            price: article.price.includes("€") ? article.price : `${article.price} €`
          }));
          setArticles(formattedData);
        })
        .catch((err) => console.error("Erreur chargement articles depuis S3:", err));
    }
  }, [view, cacheBuster]);

  // ✅ Ajouter un article
  const handleAddArticle = (newArticle) => {
    setArticles((prev) => [...prev, newArticle]);
    setShowAddArticleModal(false);
    // Refresh pour être sûr d'avoir les dernières données de S3
    setCacheBuster(Date.now());
  };

  // ✅ Modifier un texte
  const modifyText = (section, keyPath) => {
    if (!keyPath) {
      console.error("❌ Clé invalide reçue pour modification :", keyPath);
      return;
    }

    const keys = Array.isArray(keyPath) ? keyPath : keyPath.split(".");
    let currentValue = content?.[section];

    for (let key of keys) {
      if (currentValue && key in currentValue) {
        currentValue = currentValue[key];
      } else {
        console.error("❌ Clé introuvable dans les données :", keyPath);
        return;
      }
    }

    setSelectedText({ section, keys });
    setNewText(currentValue || "");
    setShowTextModal(true);  // Ouvrir la modal
  };

  // ✅ Sauvegarde du texte modifié sur S3
  const handleTextUpdate = async () => {
    if (!selectedText) return;

    try {
      const res = await fetch("/api/update-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: selectedText.section,
          keys: selectedText.keys,
          value: newText,
        }),
      });

      if (res.ok) {
        // Mise à jour de l'état local
        setContent((prev) => {
          let updatedContent = JSON.parse(JSON.stringify(prev));
          let target = updatedContent[selectedText.section];

          for (let i = 0; i < selectedText.keys.length - 1; i++) {
            target = target[selectedText.keys[i]];
          }

          target[selectedText.keys[selectedText.keys.length - 1]] = newText;

          return updatedContent;
        });

        // Refresh pour être sûr d'avoir les dernières données de S3
        setCacheBuster(Date.now());
        setSectionKey(Date.now());
      }
    } catch (error) {
      console.error("❌ Erreur mise à jour texte sur S3:", error);
      alert("Erreur lors de la mise à jour du texte");
    }

    setSelectedText(null);
    setNewText("");
    setShowTextModal(false);
  };

  // ✅ Modifier une image
  const modifyImage = (imagePath) => {
    console.log("🟠 Modifier l'image S3:", imagePath);
    setSelectedImage(imagePath);
    setPreviewImage(null);
    setShowImageModal(true);
  };

  // ✅ Prévisualisation de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Sauvegarde de l'image modifiée sur S3
  const handleImageUpdate = async () => {
    if (!selectedImage || !newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("oldImage", selectedImage);

    try {
      const res = await fetch("/api/update-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        
        // Mise à jour de l'état local si nécessaire
        // Pour l'instant, on force juste le rechargement avec cacheBuster
        
        // Refresh pour être sûr d'avoir les dernières données de S3
        setCacheBuster(Date.now());
        alert("Image mise à jour avec succès");
      } else {
        alert("Erreur lors de la mise à jour de l'image");
      }
    } catch (error) {
      console.error("Erreur mise à jour image sur S3:", error);
      alert("Erreur lors de la mise à jour de l'image");
    }

    setSelectedImage(null);
    setNewImage(null);
    setPreviewImage(null);
    setShowImageModal(false);
  };

  // ✅ Supprimer un article
  const handleDeleteArticle = async (articleId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    try {
      const res = await fetch(`/api/delete-article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: articleId }),
      });

      if (res.ok) {
        // Mise à jour de l'état local
        setArticles((prev) => prev.filter(article => article.id !== articleId));
        setCacheBuster(Date.now());
        alert("Article supprimé avec succès");
      } else {
        alert("Erreur lors de la suppression de l'article");
      }
    } catch (error) {
      console.error("Erreur suppression article sur S3:", error);
      alert("Erreur lors de la suppression de l'article");
    }
  };

  const renderHome = () => {
    const WrappedSection = sections[selectedSection];
    return (
      <>
        <div className="mb-4 flex space-x-4">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedSection(key)}
              className={`px-4 py-2 rounded-lg ${selectedSection === key ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-900"}`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="border-4 border-dashed border-gray-500 p-4 rounded-lg w-full max-w-4xl relative">
          {WrappedSection && (
            <WrappedSection key={sectionKey} modifyImage={modifyImage} modifyText={modifyText} cacheBuster={cacheBuster} content={content?.[selectedSection]} />
          )}
        </div>
      </>
    );
  };

  const renderArticles = () => {
    return (
      <>
        <button onClick={() => setShowAddArticleModal(true)} className="mb-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Ajouter un article
        </button>

        {showAddArticleModal && <ModalAjoutArticle onClose={() => setShowAddArticleModal(false)} onSave={handleAddArticle} />}

        <div className="border-4 border-dashed border-gray-500 p-4 rounded-lg w-full max-w-4xl relative">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Gestion des Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {articles.map(article => (
                <div key={article.id} className="border rounded-lg p-4 relative">
                  <img src={article.image} alt={article.name} className="w-full h-48 object-cover rounded-lg mb-2" />
                  <h3 className="font-bold">{article.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                  <p className="font-bold">{article.price}</p>
                  <button 
                    onClick={() => handleDeleteArticle(article.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Section1Articles products={articles} />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin 🛠️</h1>

      <div className="mb-4 flex space-x-4">
        <button onClick={() => setView("home")} className={`px-4 py-2 rounded-lg ${view === "home" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-900"}`}>
          Page d'accueil
        </button>
        <button onClick={() => setView("articles")} className={`px-4 py-2 rounded-lg ${view === "articles" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-900"}`}>
          Articles
        </button>
      </div>

      {view === "home" && renderHome()}
      {view === "articles" && renderArticles()}

      {/* Modal pour l'édition de texte */}
      <TextEditModal 
        isOpen={showTextModal}
        onClose={(save) => {
          if (save) handleTextUpdate();
          else setShowTextModal(false);
        }}
        text={{ value: newText }}
        onSave={setNewText}
      />

      {/* Modal pour l'édition d'image */}
      <ImageEditModal 
        isOpen={showImageModal}
        onClose={(save) => {
          if (save) handleImageUpdate();
          else setShowImageModal(false);
        }}
        previewImage={previewImage}
        onImageChange={handleImageChange}
        onSave={handleImageUpdate}
      />
    </div>
  );
}