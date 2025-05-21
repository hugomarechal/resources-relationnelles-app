import "./App.css";

import Footer from "./Components/LayoutItems/Footer";
import Header from "./Components/LayoutItems/Header";
import Navbar from "./Components/LayoutItems/Navbar";
import FeedContainer from "./Components/LayoutItems/FeedContainer.tsx";
import NewResourceLayout from "./Components/LayoutItems/NewResourceLayout.tsx";
import ProfileLayout from "./Components/LayoutItems/ProfileLayout.tsx";
import AdminLayout from "./Components/LayoutItems/AdminLayout.tsx";
import { useState } from "react";
import AuthPage from "./Components/Utilisateur/AuthPage.tsx";
import {useUser} from "./contexts/AuthContext.tsx";

import AdminUserManager from "./Components/Utilisateur/AdminUserManager";
import Login from "./Components/Utilisateur/Login.tsx";
import LogoutButton from "./Components/Utilisateur/LogoutButton";
import AdminRegister from "./Components/Utilisateur/AdminRegister.tsx";

function App() {

    const { user } = useUser();
    const [currentLayout, setCurrentLayout] = useState('home');
    const [adminOption, setAdminOption] = useState(null);
    const isLoggedIn = user !== null;
    const isAdmin = user?.role_id === 1 || user?.role_id=== 2;

    const getCurrentLayout = () => {
        switch (currentLayout) {
            case 'home':
                return <FeedContainer/>;
            case 'new':
                return isLoggedIn ? <NewResourceLayout/> : <AuthPage/>;
            case 'profile':
                return isLoggedIn ? <ProfileLayout/> : <AuthPage/>;
            case 'admin':
                return isLoggedIn && isAdmin ? <AdminLayout adminOption={adminOption} /> : <AuthPage />;
            default:
                return <FeedContainer/>;
        }
    }

  return (
    <>
      <Header />
      {getCurrentLayout()}
      <Navbar setCurrentLayout={setCurrentLayout} setAdminOption={setAdminOption}/>
      <Footer />
    </>
  );
}

export default App;
