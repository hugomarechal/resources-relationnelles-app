import React from "react";

type Props = {
  setCurrentLayout: (layout: string) => void;
  setAdminOption: (option: string) => void;
  isAdmin: boolean;
};

const adminMenuChoices = [
  { id: "categories", label: "Gestion des catégories" },
  { id: "ressources", label: "Gestion des ressources" },
  { id: "users", label: "Gestion des utilisateurs" },
  { id: "comments", label: "Gestion des commentaires" },
];

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="w-5 h-5 mb-1 fill-current" viewBox="0 0 20 20">
      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
    </svg>
  ),
  add: (
    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
    </svg>
  ),
  profile: (
    <svg className="w-5 h-5 mb-1 fill-current" viewBox="0 0 20 20">
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  ),
  admin: (
    <svg className="w-5 h-5 mb-1 fill-current" viewBox="0 0 20 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
    </svg>
  ),
};

const Header: React.FC<Props> = ({ setCurrentLayout, setAdminOption, isAdmin }) => {
  const [adminOpen, setAdminOpen] = React.useState(false);
  const adminRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setAdminOpen(false);
      }
    };
    if (adminOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminOpen]);

  const navItems = [
    { id: "home", tooltip: "Accueil", onClick: () => setCurrentLayout("home"), rounded: "rounded-s-full" },
    { id: "add", tooltip: "Ajouter une ressource", isCenter: true, onClick: () => setCurrentLayout("add") },
    { id: "profile", tooltip: "Profil", onClick: () => setCurrentLayout("profile"), rounded: isAdmin ? "" : "rounded-e-full" },
    ...(isAdmin
      ? [{ id: "admin", tooltip: "Administration", isAdminMenu: true, rounded: "rounded-e-full" }]
      : []),
  ];

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className={`grid h-full max-w-lg mx-auto grid-cols-${navItems.length}`}>
        {navItems.map((item, i) => {
          // Bouton central (ajout)
          if (item.isCenter) {
            return (
              <div key={i} className="flex items-center justify-center">
                <div className="relative group flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="inline-flex items-center justify-center w-12 h-12 font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-200 shadow-lg"
                  >
                    {icons[item.id]}
                    <span className="sr-only">{item.tooltip}</span>
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                    {item.tooltip}
                  </span>
                </div>
              </div>
            );
          }

          // Bouton admin (menu déroulant)
          if (item.isAdminMenu) {
            return (
              <div
                key={i}
                className="relative group flex flex-col items-center justify-center h-full"
                ref={adminRef}
              >
                <button
                  type="button"
                  onClick={() => setAdminOpen((open) => !open)}
                  className={`w-full h-full flex flex-col items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${item.rounded}`}
                >
                  {icons[item.id]}
                  <span className="sr-only">{item.tooltip}</span>
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-600 px-3 py-2 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-10 shadow-lg">
                  {item.tooltip}
                </span>
                {adminOpen && (
                  <div className="absolute bottom-full mb-12 right-0 min-w-max bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 animate-fade-in">
                    {adminMenuChoices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => {
                          setAdminOpen(false);
                          setAdminOption(choice.id);
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

          // Autres boutons
          return (
            <div
              key={i}
              className="relative group flex flex-col items-center justify-center h-full"
            >
              <button
                type="button"
                onClick={item.onClick}
                className={`w-full h-full flex flex-col items-center justify-center px-5 transition-colors duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${item.rounded}`}
              >
                {icons[item.id]}
                <span className="sr-only">{item.tooltip}</span>
              </button>
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
