import Select from "react-select";

const DropdownSelectLocation = ({
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

  // Format the "create" message

  // Custom NoOptionsMessage component
  const NoOptionsMessage = () => {
    return loading ? (
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border  mx-auto mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div style={{ padding: "8px 12px", color: "#666" }}>
          fetching locations
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
            ? options.find((option) => option.value === value)
            : null
        }
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        className="text-start select-borderless"
        classNamePrefix="select"
        onChange={(selectedOption) => onChange(selectedOption?.value || "")}
        isClearable={isClearable}
        isSearchable={true}
        // Enable creating custom options
        creatable={true}
        // Custom components
        components={{
          NoOptionsMessage,
        }}
      />
    </div>
  );
};

export default DropdownSelectLocation;
