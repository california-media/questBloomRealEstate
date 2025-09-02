import React from "react";

const PropertyType = ({
  propertyTypes = [],
  setPropertyType,
  propertyType,
}) => {
  const options = propertyTypes.map((item, index) => ({
    label: item.value?.charAt(0).toUpperCase() + item.value.slice(1),
  }));

  return (
    <>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={propertyType === option.label}
            onChange={(e) => {
              setPropertyType(option.label);
            }}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
