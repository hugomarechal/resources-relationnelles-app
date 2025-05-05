import React, { useState, useRef, useEffect } from "react";

const isAdmin = true;

const onHome = () => alert("Accueil !");
const onAdd = () => alert("Ajout de contenu !");
const onProfile = () => alert("Profil utilisateur !");
const onAdminChoice = (choice: string) => alert(`Admin : ${choice}`);

const adminMenuChoices = [
  { key: "categories", label: "Gestion des catégories" },
  { key: "ressources", label: "Gestion des ressources" },
  { key: "users", label: "Gestion des utilisateurs" },
  { key: "comments", label: "Gestion des commentaires" },
];

const navItems = [
  {
    key: "home",
    tooltip: "Accueil",
    onClick: onHome,
    svg: (
      <svg
        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
      </svg>
    ),
    srOnly: "Accueil",
  },
  {
    key: "add",
    tooltip: "Ajouter du contenu",
    isCenter: true,
    onClick: onAdd,
    svg: (
      <svg
        className="w-4 h-4 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    ),
    srOnly: "Ajouter du contenu",
  },
  {
    key: "profile",
    tooltip: "Profil",
    onClick: onProfile,
    svg: (
      <svg
        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
    ),
    srOnly: "Profil",
  },
  {
    key: "admin",
    tooltip: "Administration",
    isAdminMenu: true,
    onlyAdmin: true, // S'affiche uniquement pour les admins
    svg: (
      <svg
        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
        />
      </svg>
    ),
    srOnly: "Administration",
  },
];

const Header: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  // Fermer le menu admin si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setAdminOpen(false);
      }
    };
    if (adminOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminOpen]);

  // Filtrer les boutons selon le statut admin
  const visibleNavItems = navItems.filter(
    (item) => !item.onlyAdmin || isAdmin
  );

  // Récupérer les index des boutons non centraux visibles
  const nonCenterIndexes = visibleNavItems
    .map((item, idx) => (!item.isCenter ? idx : null))
    .filter((idx) => idx !== null) as number[];

  // Fonction pour gérer dynamiquement les arrondis
  const getWrapperClass = (item: any, index: number) => {
    if (item.isCenter) return "";
    if (index === nonCenterIndexes[0]) return "rounded-s-full";
    if (index === nonCenterIndexes[nonCenterIndexes.length - 1]) return "rounded-e-full";
    return "";
  };

  // Adapter le nombre de colonnes de la grille
  const gridColsClass = `grid-cols-${visibleNavItems.length}`;

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className={`grid h-full max-w-lg ${gridColsClass} mx-auto`}>
        {visibleNavItems.map((item, index) => {
          // Bouton central (cercle bleu)
          if (item.isCenter) {
            return (
              <div key={item.key} className="flex items-center justify-center">
                <div className="relative group flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-200"
                  >
                    {item.svg}
                    <span className="sr-only">{item.srOnly}</span>
                  </button>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                    {item.tooltip}
                  </span>
                </div>
              </div>
            );
          }

          // Bouton admin avec menu déroulant vers le haut
          if (item.isAdminMenu) {
            return (
              <div
                key={item.key}
                className={`relative group flex flex-col items-center justify-center h-full`}
                ref={adminRef}
              >
                <div
                  className={`w-full h-full flex items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${getWrapperClass(item, index)}`}
                >
                  <button
                    type="button"
                    onClick={() => setAdminOpen((open) => !open)}
                    className="bg-transparent flex flex-col items-center justify-center focus:outline-none"
                  >
                    {item.svg}
                    <span className="sr-only">{item.srOnly}</span>
                  </button>
                </div>
                {/* Tooltip */}
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                  {item.tooltip}
                </span>
                {/* Menu déroulant admin qui s'ouvre vers le haut */}
                {adminOpen && (
                  <div className="absolute bottom-full mb-12 right-0 min-w-max bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 animate-fade-in">
                    {adminMenuChoices.map((choice) => (
                      <button
                        key={choice.key}
                        onClick={() => {
                          setAdminOpen(false);
                          onAdminChoice(choice.label);
                        }}
                        className="block w-full text-left px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100 transition"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Autres boutons (Accueil, Profil)
          return (
            <div
              key={item.key}
              className={`relative group flex flex-col items-center justify-center h-full`}
            >
              <div
                className={`w-full h-full flex items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${getWrapperClass(item, index)}`}
              >
                <button
                  type="button"
                  onClick={item.onClick}
                  className="bg-transparent flex flex-col items-center justify-center focus:outline-none"
                >
                  {item.svg}
                  <span className="sr-only">{item.srOnly}</span>
                </button>
              </div>
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                {item.tooltip}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
