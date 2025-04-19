import { useState } from "react";
import "./App.css";
import SelectBox  from "./Components/Form/SelectBox";

function App() {

  const options = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Strawberry' },
    { value: '3', label: 'Vanilla' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <h1 className="text-4xl text-[#000000]">Test title</h1>
      <SelectBox
        value={selectedOption}
        options={options}
        onChange={setSelectedOption}
        isDisabled={false}
      />
      {selectedOption && (
        <p>Tu as choisi : {selectedOption.label}</p>
      )}
      <button className="flex bg-red-500">test button</button>
    </>
  );
}

export default App;
