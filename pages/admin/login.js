import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true"); // 🔐 Stocke l'authentification
      router.push("/admin/dashboard");
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Connexion Admin</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <input 
          type="password" 
          placeholder="Mot de passe" 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white">
          Se connecter
        </button>
      </form>
    </div>
  );
}
