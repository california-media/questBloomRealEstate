import {
  ChartNoAxesCombined,
  Check,
  CircleDot,
  Clock,
  ImageOff,
  Scale3D,
  SlashSquare,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
const formatCompletionDate = (dateString) => {
  if (!dateString) return "No info";

  const date = new Date(dateString);
  const quarter = Math.ceil((date.getMonth() + 1) / 3);
  const year = date.getFullYear();
  return `Q${quarter} ${year}`;
};
const FeatuerdListingsBuyOffplan = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={`d-flex ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-3"
          }`}
          key={listing.listing_prefix + String(listing.id)}
        >
          <div
            className={`listing-style1 ${
              colstyle ? "listCustom listing-type" : ""
            } w-100 d-flex flex-column`}
          >
            <div className="list-thumb">
              {listing.image ? (
                <img
                  className="w-100 cover"
                  style={{ height: "230px" }}
                  src={listing.image}
                  alt={listing.title}
                />
              ) : (
                <div
                  className="d-flex flex-column align-items-center justify-content-center bg-light"
                  style={{ height: "230px" }}
                >
                  <ImageOff size={48} className="text-muted mb-2" />
                  <span className="text-muted">No Image Available</span>
                </div>
              )}

              <div className="list-price">
                {listing?.sale_status || "No info"}
              </div>
            </div>

            <div className="list-content flex-grow-1 d-flex flex-column justify-content-between">
              <div>
                <h6 className="list-title">
                  <Link
                    to={`/${
                      listing.listing_prefix === "op" ? "off-plan" : "buy"
                    }/${listing.listing_prefix}-${listing.id}`}
                  >
                    {listing.title}
                  </Link>
                </h6>
                <p className="list-text mb-0">{listing.location}</p>
              </div>

              <hr className="mt-1 mb-1" style={{ borderColor: "gray" }} />

              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <div>
                  Price from{" "}
                  <h6 className="fw-semibold pb-0 mb-0 ">
                    {Number(listing.price.split("$")[1]) === 0
                      ? "Ask for price"
                      : "AED " +
                        Number(listing.price.split("$")[1]).toLocaleString()}
                  </h6>
                </div>
                <div>
                  Completion{" "}
                  <h6 className="fw-semibold pb-0 mb-0 ">
                    {listing?.yearBuilding && listing.yearBuilding !== "N/A"
                      ? listing.yearBuilding
                      : formatCompletionDate(listing?.completion_datetime)}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeatuerdListingsBuyOffplan;
