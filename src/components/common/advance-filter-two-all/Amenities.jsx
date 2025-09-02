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

const Amenities = ({ facilityOptions, amenities = [], setAmenities }) => {
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
                      checked={amenities.some((item) => item === amenity.label)}
                      onChange={() => {
                        setAmenities(
                          (prevAmenities) =>
                            prevAmenities.includes(amenity.label)
                              ? prevAmenities.filter(
                                  (item) => item !== amenity.label
                                ) // Remove if exists
                              : [...prevAmenities, amenity.label] // Add if doesn't exist
                        );
                      }}
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
