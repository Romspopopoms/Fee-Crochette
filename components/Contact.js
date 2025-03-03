import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    alert("Message envoyé avec succès !");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Champ Nom */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
              placeholder="Votre nom"
            />
          </div>

          {/* Champ Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
              placeholder="Votre email"
            />
          </div>
        </div>

        {/* Champ Message */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 h-32"
            required
            placeholder="Votre message..."
          />
        </div>

        {/* Bouton Envoyer */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
