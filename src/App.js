import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import {US_STATES, YEARS} from "./Data"

function App() {
  const [singleSelectedOptions, setSingleSelectedOptions] = useState([]);
  const [multipleSelectedOptions, setMultipleSelectedOptions] = useState([]);
  const [otherMultipleSelectedOptions, setOtherMultipleSelectedOptions] = useState([]);

  return (
    <div>
      <div style={{ fontSize: "28px" }}>
        This is an example of single selection
      </div>
      <DropdownMenu
        title="State"
        options={US_STATES}
        selectedOptions={singleSelectedOptions}
        setSelectedOptions={setSingleSelectedOptions}
        isMultipleSelect={false}
      />

      <div style={{ fontSize: "28px" }}>
        This is an example of multiple selection
      </div>
      <DropdownMenu
        title="Years"
        options={YEARS}
        selectedOptions={multipleSelectedOptions}
        setSelectedOptions={setMultipleSelectedOptions}
        isMultipleSelect={true}
      />

<div style={{ fontSize: "28px" }}>
        Other example
      </div>
      <DropdownMenu
        options={["This is a very very very very long option", "This_is_another_very_long_option", "option1", "option2", "option3", "option4", "option5", "option6"]}
        selectedOptions={otherMultipleSelectedOptions}
        setSelectedOptions={setOtherMultipleSelectedOptions}
        isMultipleSelect={true}
      />
    </div>
  );
}

export default App;
