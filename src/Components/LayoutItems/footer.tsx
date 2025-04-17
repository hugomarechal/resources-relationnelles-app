import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} (RE)Sources Relationnelles. Tous droits réservés.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/about" className="hover:underline">À propos</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/legal" className="hover:underline">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;