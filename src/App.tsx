import "./App.css";
import Footer from "./Components/LayoutItems/Footer";
import Header from "./Components/LayoutItems/Header";
import Navbar from "./Components/LayoutItems/Navbar";
import AuthPage from "./Components/Utilisateur/AuthPage";

function App() {

return (
    <>
    <Header/>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          (RE)SOURCES RELATIONNELLES
        </span>
        
      </h1>
     
    <AuthPage />
    <Navbar/>
    <Footer/>
    </>
  );
}

export default App;