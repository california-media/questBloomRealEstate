import Select from "react-select";

const SelectDropdown = ({ saleStatuses = [], filterFunctions }) => {
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
  const statuses = saleStatuses.map((option) => ({
    value: option,
    label: option,
  }));
  return (
    <>
      <Select
        defaultValue={statuses[0] || null}
        name="colors"
        options={statuses}
        styles={customStyles}
        className="text-start select-borderless"
        value={{
          value: filterFunctions?.listingStatus,
          label: filterFunctions?.listingStatus,
        }}
        classNamePrefix="select"
        onChange={(e) => filterFunctions?.handlelistingStatus(e.value)}
        required
      />
    </>
  );
};

export default SelectDropdown;
