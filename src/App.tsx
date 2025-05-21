import "./App.css";

import Footer from "./Components/LayoutItems/Footer";
import Header from "./Components/LayoutItems/Header";
import Navbar from "./Components/LayoutItems/Navbar";
import FeedContainer from "./Components/LayoutItems/FeedContainer.tsx";
import NewResourceLayout from "./Components/LayoutItems/NewResourceLayout.tsx";
import ProfileLayout from "./Components/LayoutItems/ProfileLayout.tsx";
import AdminLayout from "./Components/LayoutItems/AdminLayout.tsx";
import { useState } from "react";

function App() {
  //const [user, setUser] = useState(null);
    const [currentLayout, setCurrentLayout] = useState('home');
    const [adminOption, setAdminOption] = useState(null);

    const getCurrentLayout = () => {
        switch (currentLayout) {
            case 'home':
                return <FeedContainer/>;
            case 'new':
                return <NewResourceLayout/>
            case 'profile':
                return <ProfileLayout/>
            case 'admin':
                return <AdminLayout adminOption={adminOption}/>
            default:
                return <FeedContainer/>;
        }
    }

  return (
    <>
      <Header />
        {
            getCurrentLayout()
        }
      <Navbar setCurrentLayout={setCurrentLayout} setAdminOption={setAdminOption}/>

      <Footer />
    </>
  );
}

export default App;
