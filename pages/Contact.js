import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import Section4 from "@/components/Accueil/Section4";

export default function ContactPage() {
  return (
    <div className="w-full min-h-full flex flex-col bg-[#F2F2F2]">
      <Navbar />
      <Contact />
      <Section4 />
      <Footer />
    </div>
  );
}
