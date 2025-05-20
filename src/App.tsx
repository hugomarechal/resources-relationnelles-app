import "./App.css";
import Footer from "./Components/LayoutItems/Footer";
import Header from "./Components/LayoutItems/Header";
import Navbar from "./Components/LayoutItems/Navbar";
import AuthPage from "./Components/Utilisateur/AuthPage";
import FeedContainer from "./Components/LayoutItems/FeedContainer.tsx";
import ManageRessources from "./Components/Ressource/ManageRessources.tsx";
import { useState } from "react";

/*type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  email_verified_at: string | null;
  pseudo: string;
  code_postal: string;
  ville: string;
  actif: number;
  role_id: number;
  created_at: string;
  updated_at: string;
};*/

function App() {

const [user, setUser] = useState(null);
console.log(user);

return (
    <>
    <Header/>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          (RE)SOURCES RELATIONNELLES
        </span>
      </h1>
        <FeedContainer/>
    {/*    <ManageRessources/>*/}
    </>
  );
};

export default App;
