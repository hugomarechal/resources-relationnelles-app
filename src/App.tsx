import "./App.css";
import { useState } from "react";
import AdminUserManager from "./Components/Utilisateur/AdminUserManager";



function App() {

return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          (RE)SOURCES RELATIONNELLES
        </span>
      </h1>
      <AdminUserManager />
    </>
  );
}

export default App;