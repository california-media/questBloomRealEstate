import React from "react";

const ProjectDetailsCard = ({ projectData }) => {
  // Helper function to format completion date
  const formatCompletionDate = (dateString) => {
    if (!dateString) return "No info";

    const date = new Date(dateString);
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    const year = date.getFullYear();
    return `Q${quarter} ${year}`;
  };

  // Helper function to format status
  const formatStatus = (status) => {
    if (!status) return "No info";
    // Convert "Presale(EOI)" to "Presale"
    if (status.includes("Presale")) return "Presale";
    return status;
  };

  // Helper function to get unit types
  const getUnitTypes = (unitBlocks) => {
    if (!unitBlocks || !unitBlocks.length) return "No info";

    // Get unique unit types from unit blocks
    const types = [
      ...new Set(
        unitBlocks.map((unit) => unit.unit_type || unit.normalized_type)
      ),
    ];
    return types.join(", ");
  };

  // Helper function to get floors info from buildings
  const getFloorsInfo = (buildings) => {
    if (!buildings || !buildings.length) return "No info";

    // This is a simplified example - you might need to adjust based on actual building data structure
    // For now, using a generic format based on typical building data
    return "2 Towers: 2B + G + 10floors + R";
  };

  // Helper function to format furnishing
  const formatFurnishing = (furnishing) => {
    if (!furnishing || furnishing === "No") return "No";
    return furnishing;
  };

  // Helper function to format service charge
  const formatServiceCharge = (serviceCharge) => {
    if (!serviceCharge) return "No info";
    return serviceCharge;
  };

  // Helper function to format readiness progress
  const formatReadinessProgress = (readiness) => {
    if (!readiness) return "No info";
    return readiness;
  };

  if (!projectData) {
    return (
      <div className="card border-0 ">
        <div className="card-body p-3">
          <h6 className="card-title text-dark mb-3">Details</h6>
          <p className="text-muted">No project data available</p>
        </div>
      </div>
    );
  }

  const details = [
    {
      label: "Completion date",
      value: formatCompletionDate(projectData.completion_datetime),
    },
    {
      label: "Status",
      value: formatStatus(projectData.status || projectData.sale_status),
    },
    {
      label: "Unit types",
      value: getUnitTypes(projectData.unit_blocks),
    },
    {
      label: "Floors",
      value: getFloorsInfo(projectData.buildings),
    },
    {
      label: "Furnishing",
      value: formatFurnishing(projectData.furnishing),
    },
    {
      label: "Service Charge",
      value: formatServiceCharge(projectData.service_charge),
    },
    {
      label: "Readiness progress",
      value: formatReadinessProgress(projectData.readiness),
    },
  ];

  return (
    <div className="container-fluid ">
      <div className="row g-3">
        <div className="col-md-6  p-0">
          <div className="card border-0 ">
            <div className="card-body p-3">
              <h6 className="card-title text-dark mb-3">Details</h6>

              <div className="details-list">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center py-1"
                    style={{
                      borderBottom:
                        index < details.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <span className="text-muted" style={{ fontSize: "14px" }}>
                      {detail.label}
                    </span>
                    <span
                      className="text-dark fw-500 text-end"
                      style={{ fontSize: "14px", maxWidth: "60%" }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
