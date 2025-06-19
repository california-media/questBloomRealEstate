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
        value={statuses.find(
          (status) => status.value === filterFunctions?.listingStatus
        )}
        classNamePrefix="select"
        onChange={(e) => filterFunctions?.handlelistingStatus(e.value)}
        required
      />
    </>
  );
};

export default SelectDropdown;
