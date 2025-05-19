import "./App.css";
import AuthPage from "./Components/Utilisateur/AuthPage";
import Login from "./Components/Utilisateur/Login";
import Register from "./Components/Utilisateur/Register";
import PasswordReset from "./Components/Form/PasswordReset";

function App() {

return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          (RE)SOURCES RELATIONNELLES
        </span>
        
      </h1>
      <Login  />
    <Register />
    <AuthPage />
      <PasswordReset />
    </>
  );
}

export default App;