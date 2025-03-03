import Section1 from "@/components/Accueil/Section1";
import Navbar from "../components/Navbar";
import Section2 from "@/components/Accueil/Section2";
import Section3 from "@/components/Accueil/Section3";
import Section4 from "@/components/Accueil/Section4";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="w-full min-h-full flex flex-col bg-[#F2F2F2]">
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 /> 
      <Section4 />
      <Footer />
    </div>
  );
}
