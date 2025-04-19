import "./App.css";
import Button from "./Components/Divers/Button";

function App() {
  const handleClick = () => {
    alert("Bouton cliqué !");
  };

  // const options = [
  //   { value: "1", label: "Chocolate" },
  //   { value: "2", label: "Strawberry" },
  //   { value: "3", label: "Vanilla" },
  // ];

  // const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <h1 className="text-4xl text-[#000000]">Test title</h1>
      <br />
      <Button label={"Bouton test"} onClick={handleClick}></Button>

      {/* <SelectBox
        value={selectedOption}
        options={options}
        onChange={setSelectedOption}
        isDisabled={false}
      />
      {selectedOption && <p>Tu as choisi : {selectedOption.label}</p>}
      <button className="flex bg-red-500">test button</button> */}
    </>
  );
}

export default App;
