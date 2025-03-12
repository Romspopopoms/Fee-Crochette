import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/Logo.png"
import Search from "./Search";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Référence pour détecter les clics hors du menu

  // Gestion du clic en dehors du menu pour le fermer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-navbar shadow-md w-full p-2 fixed z-50">
      {/* Navbar Desktop */}
      <div className="hidden md:grid grid-cols-3 items-center px-8 py-2">
        {/* Menu à gauche */}
        <ul className="flex space-x-4 font-gluten text-lg">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ACCUEIL
            </Link>
          </li>
          <li>
            <Link href="/Produits" className="text-gray-600 hover:text-gray-900">
              PRODUITS
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="text-gray-600 hover:text-gray-900">
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Logo centré */}
        <div className="flex justify-center">
          <Image src={Logo} width={160} height={160} alt="logo" />
        </div>

        {/* Barre de recherche à droite */}
        <div className="flex justify-end">
          <Search />
        </div>
      </div>

      {/* Navbar Mobile */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden relative">
        {/* Icône menu burger à gauche */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative z-10 transition-transform duration-500"
        >
          {isOpen ? (
            <AiOutlineClose size={28} className="text-gray-700" />
          ) : (
            <AiOutlineMenu size={28} className="text-gray-700" />
          )}
        </button>

        {/* Logo centré en mobile */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={Logo} width={90} height={90} alt="logo" />
        </div>
      </div>

      {/* Overlay pour cliquer n'importe où et fermer le menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Menu Mobile avec transition smooth */}
      <div
        ref={menuRef} 
        className={`absolute top-full left-0 w-full bg-navbar shadow-md z-50 transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center space-y-2 py-4 text-lg font-gluten">
          <li>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              ACCUEIL
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              PRODUITS
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
