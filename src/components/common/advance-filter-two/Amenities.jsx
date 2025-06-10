function convertFacilityOptions(facilityOptions, defaultCheckedOptions = []) {
  if (facilityOptions.length === 0) return [];
  const formatted = facilityOptions.map((option) => ({
    label: option,
    ...(defaultCheckedOptions.includes(option) && { defaultChecked: true }),
  }));

  // Group into chunks of 4
  const chunkSize = 4;
  const grouped = [];
  for (let i = 0; i < formatted.length; i += chunkSize) {
    grouped.push(formatted.slice(i, i + chunkSize));
  }

  return grouped;
}

const Amenities = ({ filterFunctions, facilityOptions }) => {
  return (
    <>
      {convertFacilityOptions(facilityOptions, []).map(
        (column, columnIndex) => (
          <div className="col-sm-4" key={columnIndex}>
            <div className="widget-wrapper mb20">
              <div className="checkbox-style1">
                {column.map((amenity, amenityIndex) => (
                  <label className="custom_checkbox" key={amenityIndex}>
                    {amenity.label}
                    <input
                      checked={filterFunctions?.categories.includes(
                        amenity.label
                      )}
                      onChange={() =>
                        filterFunctions?.handlecategories(amenity.label)
                      }
                      type="checkbox"
                    />
                    <span className="checkmark" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Amenities;
