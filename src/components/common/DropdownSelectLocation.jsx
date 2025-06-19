import Select from "react-select";

const DropdownSelectLocation = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  isClearable = false,
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
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: placeholder === "Enter Location" ? "none" : "inline",
  
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: placeholder === "Enter Location" ? "none" : "inline",
    }),
    // Add padding to input to make space for the icon
    input: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
    }),
    // Ensure the placeholder also has proper spacing
    placeholder: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
    }),
    // Style the single value (selected value) to have proper spacing
    singleValue: (provided) => ({
      ...provided,
      paddingLeft: placeholder === "Enter Location" ? "35px" : "10px",
    }),
  };

  const selectOptions =
    placeholder === "Bathrooms"
      ? options.map((option) => ({
          value: option,
          label: option === 1 ? `${option} Bathroom` : `${option} Bathrooms`,
        }))
      : placeholder === "Bedrooms"
      ? options.map((option) => ({
          value: option,
          label: option === 1 ? `${option} Bedroom` : `${option} Bedrooms`,
        }))
      : options.map((option) => ({
          value: option,
          label: option,
        }));

  // Handle creating new options from user input
  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    onChange(inputValue);
    return newOption;
  };

  // Format the "create" message
  const formatCreateLabel = (inputValue) => `Use "${inputValue}"`;

  // Custom NoOptionsMessage component
  const NoOptionsMessage = ({ inputValue }) => {
    if (inputValue) {
      return (
        <div style={{ padding: "8px 12px", color: "#666" }}>
          Press Enter to use "{inputValue}"
        </div>
      );
    }
    return <div style={{ padding: "8px 12px", color: "#666" }}>No options</div>;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Render icon directly in the container for location input */}
      {placeholder === "Enter Location" && (
        <span
          className="icon flaticon-maps-1 mt-1 me-3 ms-2"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      <Select
        value={
          value && value != 0
            ? selectOptions.find((option) => option.value === value) || {
                value: value,
                label: value,
              }
            : null
        }
        options={selectOptions}
        styles={customStyles}
        placeholder={placeholder}
        className="text-start select-borderless"
        classNamePrefix="select"
        onChange={(selectedOption) => onChange(selectedOption?.value || "")}
        isClearable={isClearable}
        isSearchable={true}
        // Enable creating custom options
        creatable={true}
        onCreateOption={handleCreateOption}
        formatCreateLabel={formatCreateLabel}
        // Custom components
        components={{
          NoOptionsMessage,
        }}
        // Allow creating options when no exact match exists
        isValidNewOption={(inputValue, selectValue, selectOptions) => {
          return inputValue && inputValue.trim().length > 0;
        }}
      />
    </div>
  );
};

export default DropdownSelectLocation;
