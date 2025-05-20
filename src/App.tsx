import "./App.css";
import React from "react";
import ManageCategories from "./Components/Categorie/ManageCategories";
import ManageRessources from "./Components/Ressource/ManageRessources";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <ManageCategories/> */}
      <ManageRessources/>
    </div>
  );
};

export default App;
