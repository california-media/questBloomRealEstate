import Select from "react-select";

const DropdownSelect = ({
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
  };

  const selectOptions =
    placeholder === "Bathrooms"
      ? options.map((option) => ({
          value: option,
          label: value === 1 ? `${option} Bathroom` : `${option} Bathrooms`,
        }))
      : placeholder === "Bedrooms"
      ? options.map((option) => ({
          value: option,
          label: value === 1 ? `${option} Bedroom` : `${option} Bedrooms`,
        }))
      : options.map((option) => ({
          value: option,
          label: option,
        }));

  return (
    <Select
      value={
        value && value != 0
          ? selectOptions.find((option) => option.value === value)
          : null
      }
      options={selectOptions}
      styles={customStyles}
      placeholder={placeholder}
      className="text-start select-borderless"
      classNamePrefix="select"
      onChange={(e) => onChange(e?.value || "")}
      isClearable={isClearable}
    />
  );
};

export default DropdownSelect;
