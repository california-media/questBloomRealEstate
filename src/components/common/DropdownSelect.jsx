import Select from "react-select";

const DropdownSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  isClearable = false,
  loading,
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

  const selectOptions =
    placeholder === "Bathrooms"
      ? options.map((option) => ({
          value: option,
          label:
            option === 1
              ? `${option} Bathroom`.charAt(0).toUpperCase() +
                `${option} Bathroom`.slice(1)
              : `${option} Bathrooms`.charAt(0).toUpperCase() +
                `${option} Bathrooms`.slice(1),
        }))
      : placeholder === "Bedrooms"
      ? options.map((option) => ({
          value: option,
          label:
            option === 1
              ? `${option} Bedroom`.charAt(0).toUpperCase() +
                `${option} Bedroom`.slice(1)
              : `${option} Bedrooms`.charAt(0).toUpperCase() +
                `${option} Bedrooms`.slice(1),
        }))
      : options.map((option) => ({
          value: option,
          label: option.charAt(0).toUpperCase() + option.slice(1),
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
    return loading ? (
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border  mx-auto mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div style={{ padding: "8px 12px", color: "#666" }}>
          fetching options
        </div>
      </div>
    ) : (
      <div style={{ padding: "8px 12px", color: "#666" }}>No options</div>
    );
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
                label: value.charAt(0).toUpperCase() + value.slice(1),
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

export default DropdownSelect;
