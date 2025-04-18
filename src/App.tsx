import "./App.css";
import Button from "./Components/Divers/Button";

function App() {
  const handleClick = () => {
    alert("Bouton cliqué !");
  };

  return (
    <>
      <h1 className="text-4xl text-[#000000]">Test title</h1>
      <br />
      <Button label={"Test bouton"} onClick={handleClick}></Button>
    </>
  );
}

export default App;
