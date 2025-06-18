import React, { useState } from "react";


const PropertyDescriptions = ({ property }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const extractOverview = (overview) => {
    if (!overview) return "";

    const match = overview.match(
      /##### Project general facts\s+([\s\S]*?)(?:#####|$)/
    );
    if (!match) return "";

    return match[1].trim().replace(/\n+/g, " ");
  };

  const cleanedOverview =
    extractOverview(property?.overview) ||
    "This property offers a unique blend of modern architecture and natural elements, creating a peaceful and innovative living experience.";

  const previewText = cleanedOverview.slice(0, 200);

  return (
    <>
      <p className="text mb10">
        {isExpanded ? cleanedOverview : `${previewText}...`}
      </p>

      <div className="agent-single-accordion">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            {isExpanded && (
              <div
                id="flush-collapseOne"
                className="accordion-collapse show"
                aria-labelledby="flush-headingOne"
              >
                <div className="accordion-body p-0">
                  <p className="text">
                    Residents enjoy access to a wide range of lifestyle
                    amenities including a gym, clubhouse, swimming pools, and
                    smart home technology. Designed for both tranquility and
                    innovation, this development promotes well-being through its
                    nature-integrated architecture.
                  </p>
                </div>
              </div>
            )}

            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button p-0 collapsed"
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDescriptions;
