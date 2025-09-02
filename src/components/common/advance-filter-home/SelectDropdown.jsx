import Select from "react-select";

const SelectDropdown = ({ saleStatuses = [], saleStatus, setSaleStatus }) => {
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
      display: "inline",
      padding: "0px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "inline",
      padding: "0px",
      paddingRight: "10px",
      paddingLeft: "5px",
    }),
    // Add padding to input to make space for the icon
    input: (provided) => ({
      ...provided,
      paddingLeft: "10px",
      padding: "10px",
      paddingRight: "5px",
    }),
    // Ensure the placeholder also has proper spacing
    placeholder: (provided) => ({
      ...provided,
      paddingLeft: "10px",
      padding: "0px",
      paddingLeft: "5px",
    }),
    // Style the single value (selected value) to have proper spacing
    singleValue: (provided) => ({
      ...provided,
      paddingLeft: "10px",
      padding: "0px",
      paddingLeft: "5px",
    }),
  };

  const statuses = [
    { value: "All", label: "All Sale Satuses" },
    ...saleStatuses.map((type) => ({
      value: type,
      label: type,
    })),
  ];
  return (
    <>
      <Select
        defaultValue={statuses[1] || null}
        name="colors"
        options={statuses}
        styles={customStyles}
        className="text-start select-borderless"
        value={statuses.find((status) => status.value === saleStatus)}
        classNamePrefix="select"
        onChange={(e) => setSaleStatus(e.value)}
        required
      />
    </>
  );
};

export default SelectDropdown;
