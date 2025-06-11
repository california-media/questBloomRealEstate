import Select from "react-select";

const SelectDropdown = ({ propertyTypes, filterFunctions }) => {
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
  };

  return (
    <>
      <Select
        defaultValue={propertyTypes[0] || null}
        name="colors"
        options={propertyTypes}
        styles={customStyles}
        className="text-start select-borderless"
        value={{
          value: filterFunctions?.selectedPropertyType,
          label:
            propertyTypes.find(
              (option) => option.value === filterFunctions?.selectedPropertyType
            )?.label || "All Property Types",
        }}
        classNamePrefix="select"
        onChange={(e) => filterFunctions?.handlepropertyType(e.value)}
        required
      />
    </>
  );
};

export default SelectDropdown;
