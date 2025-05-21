import React from "react";
import logo from '../Icons/logo.png';

const EnTete: React.FC = () => (
  <header className="bg-blue-50 shadow px-6 py-2 flex items-center gap-4 mb-5">
    <img src={logo} alt="Logo du site" className="h-10 w-10" />
    <h1 className="text-2xl font-bold text-gray-800">Ressources Relationnelles</h1>
  </header>
);

export default EnTete;