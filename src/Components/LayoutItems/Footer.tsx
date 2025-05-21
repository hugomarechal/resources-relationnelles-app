import React from "react";
import logo from '../Icons/logo.png';

const Footer: React.FC = () => ( 
  <>
    <footer className="bg-gray-100 border-t mt-8">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo du site" className="h-8 w-8" />
          <span className="font-semibold text-gray-700">Ressources Relationnelles</span>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm text-gray-600">
          <li><a href="#" className="hover:underline">Conditions générales d'utilisation</a></li>
          <li><a href="#" className="hover:underline">Mentions légales</a></li>
          <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
        <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Ressources Relationnelles</span>
      </div>
    </footer>
    <div className="h-[50px]" aria-hidden="true"></div>
  </>
);

export default Footer;
