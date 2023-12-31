import React, { useState, useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import "./style.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdClear } from "react-icons/md";

function DropdownMenu({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultipleSelect,
}) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const ref = useRef();
  const lengthLimit = 24;

  // Truncate the displayed selected options if it is too long
  const truncatedSelection = () => {
    var res = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      if ([...res, selectedOptions[i]].toString().length < lengthLimit) {
        res = [...res, selectedOptions[i]];
      } else {
        break;
      }
    }
    if (res.length == 0 && selectedOptions.length != 0) {
      return selectedOptions[0].toString().slice(0, lengthLimit) + "...";
    } else {
      return (
        res.toString() + (res.length < selectedOptions.length ? ",..." : "")
      );
    }
  };

  // Open and close the menu
  const toggleDropdown = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  };

  const handleSelectOption = (option, event) => {
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
    event.stopPropagation();
  };

  // If the menu is open and the user click anyplace outside the menu, close the menu
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownMenuOpen(false);
    }
  };

  const clearSelectedOptions = () => {
    setSelectedOptions([]);
  };

  const MenuRow = ({ index, style }) => (
    <div
      className={"dropdown-item"}
      onClick={(e) => handleSelectOption(options[index], e)}
      style={style}
    >
      {/* If is multiple selection, add a checkbox to indicate selection */}
      {isMultipleSelect ? (
        <input
          type="checkbox"
          className="checkbox"
          checked={selectedOptions.includes(options[index])}
          readOnly
          id={index}
        />
      ) : null}
      {options[index]}
    </div>
  );

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
      {title ? <div className="title">{title}:</div> : null}

      <div className="select">
        <input
          type="text"
          onClick={toggleDropdown}
          placeholder="---"
          value={truncatedSelection()}
          readOnly={true}
          className="select-input"
        />

        {/* If there are selected options, add a button to reset selection */}
        {selectedOptions.length > 0 ? (
          <MdClear onClick={clearSelectedOptions} className="select-clear" />
        ) : null}

        {isDropdownMenuOpen ? (
          <HiChevronUp className="select-icon" />
        ) : (
          <HiChevronDown className="select-icon" />
        )}
        {isDropdownMenuOpen && (
          <div className="dropdown">
            <div className="dropdown-options">
              <List
                height={200}
                itemCount={options.length}
                itemSize={30}
                width={250}
              >
                {MenuRow}
              </List>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
