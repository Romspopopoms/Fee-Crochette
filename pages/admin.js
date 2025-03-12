import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      router.push("/admin/dashboard"); // 🔹 Redirection si déjà connecté
    } else {
      router.push("/admin/login"); // 🔹 Redirection vers la page de connexion
    }
  }, []);

  return <div className="text-center text-xl">Redirection en cours...</div>;
}
