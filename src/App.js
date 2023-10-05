import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const years = Array(1000)
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <div className="App">
      <DropdownMenu
        title="Age"
        // options={[1990, 1991, 1992, 1993, 1994, 1995, 1996]}
        options={["abcdefghijklmnopqrst", "test1", "test2", "test3"]}
        // options={years}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        // isMultipleSelect={false}
        isMultipleSelect={true}
      />
    </div>
  );
}

export default App;
