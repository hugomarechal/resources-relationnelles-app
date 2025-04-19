import { ChangeEvent, useState } from "react";
import "./App.css";
import Button from "./Components/Divers/Button";
import FloatingInput from "./Components/Form/FloatingInput";
import { SelectBox, SelectOption } from "./Components/Form/SelectBox";

function App() {
  // Floating input
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Liste déroulante
  const musicStyles = [
    { value: "1", label: "Rock" },
    { value: "2", label: "Jazz" },
    { value: "3", label: "Blues" },
  ];
  const options: SelectOption[] = [
    { label: "Selectionner une musique", value: "" },
    ...musicStyles.map((musicStyle) => ({
      label: musicStyle.label,
      value: musicStyle.value,
    })),
  ];
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  // Bouton
  const handleClick = () => {
    alert("Bouton cliqué !");
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          (RE)SOURCES RELATIONNELLES
        </span>
      </h1>

      <br />

      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <FloatingInput
              type={"email"}
              label={"Nom"}
              value={inputValue}
              name={"nom"}
              onChange={handleInputChange}
            ></FloatingInput>
          </div>
          <div>
            <SelectBox options={options} value={value} onChange={onChange} name={"music"} />
            {value && (
              <p className="text-xs">Id musique sélectionnée {value}</p>
            )}
          </div>
        </div>
        <Button label={"Bouton test"} onClick={handleClick}></Button>
      </form>
    </>
  );
}

export default App;
