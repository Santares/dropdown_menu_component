import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

function DropdownMenu({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultipleSelect,
}) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const ref = useRef();
  const lengthLimit = 10;

  const truncatedSelection = () => {
    var res = [];
    selectedOptions.sort();
    for (let i = 0; i < selectedOptions.length; i++) {
      if ([...res, selectedOptions[i]].toString().length < lengthLimit) {
        res = [...res, selectedOptions[i]];
      } else {
        res = [...res, "..."];
        break;
      }
    }
    return res;
  };

  // Open and close the menu
  const toggleDropdown = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  };

  const handleSelectOption = (option) => {
    if (isMultipleSelect) {
      // If the option is selected, remove it from selected options
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        // Else add it to the selected options
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      // Use current option as the only selected option and close the menu
      setSelectedOptions([option]);
      setIsDropdownMenuOpen(false);
    }
  };

  // If the menu is open and the user click anyplace outside the menu, close the menu
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownMenuOpen(false);
    }
  };

  useEffect(() => {
    // add listener to capture click event
    document.addEventListener("click", handleClickOutside);

    // clean up
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-menu" ref={ref}>
      {title && <label className="title">{title}:</label>}

      <div className="select">
        <input
          type="text"
          onClick={toggleDropdown}
          placeholder="---"
          // value={truncatedSelection()}
          value={selectedOptions}
          readOnly={true}
          className="select-input"
        />
        {isDropdownMenuOpen ? (
          <HiChevronUp className="select-icon" />
        ) : (
          <HiChevronDown className="select-icon" />
        )}

        {isDropdownMenuOpen ? (
          <div className="dropdown-options">
            {/* If is single selection, use default option to deselect */}
            {!isMultipleSelect ? (
              <div
                className={"dropdown-item"}
                onClick={() => {
                  setSelectedOptions([]);
                  setIsDropdownMenuOpen(false);
                }}
                style={{ fontStyle: "italic" }}
              >
                None
              </div>
            ) : null}
            {options.map((option, index) => (
              <div
                key={index}
                className={"dropdown-item"}
                onClick={() => handleSelectOption(option)}
              >
                {/* If is multiple selection, add a checkbox to indicate selection */}
                {isMultipleSelect ? (
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedOptions.includes(option)}
                    readOnly
                  />
                ) : null}
                {option}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DropdownMenu;
