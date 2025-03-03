import next from "next";    
import Image from "next/image";
import Logo from "@/images/Logo.png"

const Section3 = () => {
    return (
        <div className="w-full py-12">
              <div className="flex flex-col md:flex-row justify-center items-center">
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <Image src={Logo} width={800} height={800} alt="logo" className="w-full object-cover" />
                </div>
        
                {/* Texte */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full py-4 text-center space-4 md:space-y-6">
                  <p className="px-4 font-afacad text-2xl md:max-w-[60%] max-w-[80%] font-normal leading-7 ">
                  Chaque produit de La Fée Crochette est le fruit d’un savoir-faire artisanal unique. Du choix des matériaux à la dernière maille, tout est pensé avec soin et passion.
Nous utilisons des fils de haute qualité, sélectionnés pour leur douceur, leur durabilité, et leur palette de couleurs inspirantes. Chaque pièce est réalisée à la main, garantissant des finitions soignées et une attention particulière aux détails.
Notre méthode privilégie l'authenticité : pas de production en série, mais des créations qui portent l’empreinte de leur créatrice. Cela signifie que chaque article est une pièce unique, confectionnée avec amour pour vous apporter un produit aussi beau que durable.                  </p>
                </div> 
            </div>
        </div>
    )
}

export default Section3