import "./App.css";

import Footer from "./Components/LayoutItems/Footer";
import Header from "./Components/LayoutItems/Header";
import Navbar from "./Components/LayoutItems/Navbar";
import FeedContainer from "./Components/LayoutItems/FeedContainer.tsx";
import { useState } from "react";
import Footer from "./Components/LayoutItems/footer.tsx";

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
import AdminUserManager from "./Components/Utilisateur/AdminUserManager";
import Login from "./Components/Utilisateur/Login.tsx";
import LogoutButton from "./Components/Utilisateur/LogoutButton";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <>
      <div className="mb-5">
        <Header />
      </div>

      <FeedContainer />
      <Navbar />

      <Footer />
    </>
  );
}

export default App;
