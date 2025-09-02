import React from "react";

const ListingStatus = ({
  filterFunctions,
  saleStatuses = [],
  setDataFetched,
}) => {
  const formattedStatuses = [
    { id: "flexRadioDefault0", label: "All", defaultChecked: true },
    ...saleStatuses.map((status, index) => ({
      id: `flexRadioDefault${index + 1}`,
      label: status,
    })),
  ];
  return (
    <>
      {formattedStatuses.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus == option.label}
            onChange={() => {
              setDataFetched(false);
              filterFunctions.handlelistingStatus(option.label);
            }}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
