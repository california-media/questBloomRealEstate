import Select from "react-select";

const DropdownSelectYearBuild = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#797631"
          : isHovered
          ? "#DDE5C2"
          : isFocused
          ? "#DDE5C2"
          : undefined,
      };
    },
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      padding: "0px",
      paddingRight: "10px",
      paddingLeft: "5px",
      backgroundColor: "buttonface",
      borderRadius: "12px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: placeholder === "Enter Location" ? "none" : "inline",
      padding: "0px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: placeholder === "Enter Location" ? "none" : "inline",
      padding: "0px",
      paddingRight: "10px",
      paddingLeft: "5px",
    }),
    // Add padding to input to make space for the icon
    input: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
      padding: "0px",
      paddingRight: "5px",
      paddingLeft: "5px",
    }),
    // Ensure the placeholder also has proper spacing
    placeholder: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
      padding: "0px",
      paddingLeft: "5px",
    }),
    // Style the single value (selected value) to have proper spacing
    singleValue: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
      padding: "0px",
      paddingLeft: "5px",
    }),
  };

  // Format the "create" message
  const selectedOptions = [
    { value: "50000", label: "Any" },
    ...options.map((type) => ({
      value: type,
      label: type,
    })),
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Render icon directly in the container for location input */}

      <Select
        value={
          value && value != "50000"
            ? selectedOptions.find((option) => option.value === value)
            : { value: "50000", label: "Any" }
        }
        options={selectedOptions}
        styles={customStyles}
        placeholder={placeholder}
        className="text-start select-borderless"
        classNamePrefix="select"
        onChange={(selectedOption) => onChange(selectedOption?.value || "")}
        isSearchable={true}
        // Enable creating custom options
        // Custom components
      />
    </div>
  );
};

export default DropdownSelectYearBuild;
