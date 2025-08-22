import {
  ChartNoAxesCombined,
  Check,
  CircleDot,
  Clock,
  UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const formatCompletionDate = (dateString) => {
  if (!dateString) return "No info";

  const date = new Date(dateString);
  const quarter = Math.ceil((date.getMonth() + 1) / 3);
  const year = date.getFullYear();
  return `Q${quarter} ${year}`;
};
const FeaturedListings = ({ data, colstyle }) => {
  const location = useLocation();
  const basePath = location.pathname.split("/")[1];
  const validPaths = ["off-plan", "buy", "rent", "listings"];
  const pathPrefix = validPaths.includes(basePath) ? basePath : "off-plan";

  // Function to generate the prefixed ID
  const getPrefixedId = (listing) => {
    switch (pathPrefix) {
      case "rent":
        return `qr-${listing.id}`;
      case "off-plan":
        return `op-${listing.id}`;
      case "buy":
        return `qb-${listing.id}`;
      case "listings":
        return listing.id.toString(); // no prefix
      default:
        return `op-${listing.id}`; // default to off-plan
    }
  };
  return (
    <>
      {data.map((listing) => {
        return (
          <div
            className={`d-flex ${
              colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-3"
            }`}
            key={listing.id}
          >
            <div
              className={`listing-style1 ${
                colstyle ? "listCustom listing-type" : ""
              } w-100 d-flex flex-column `}
            >
              <div className="list-thumb">
                <img
                  className="w-100  cover"
                  style={{ height: "230px" }}
                  src={listing.image}
                  alt="listings"
                />
                <div className="sale-sticker-wrap">
                  {listing.featured && (
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="list-price">
                  {listing?.sale_status || "No info"}
                </div>
              </div>
              <div className="list-content flex-grow-1 p-3  d-flex flex-column justify-content-between ">
                <div >
                  <h6 className="list-title">
                    <Link to={`/${pathPrefix}/${getPrefixedId(listing)}`}>
                      {listing.title}
                    </Link>
                  </h6>
                  <p className="list-text mb-0">{listing.location}</p>
                </div>
                {/* <div className="list-meta d-flex align-items-center r">
                  <a href="#">
                    <UserIcon size={16} color="gray" className="mb-1" />{" "}
                    {listing.developer}
                  </a>
                  <a href="#">
                    {listing.post_handover ? (
                      <Check size={16} color="gray" className="m-1" />
                    ) : (
                      <CircleDot size={16} color="gray" className="m-1" />
                    )}
                    {listing.post_handover ? "Post Handover" : "Pre Handover"}
                  </a>
                  <a href="#">
                    <Clock size={16} color="gray" className="mb-1" />{" "}
                    {listing.yearBuilding}
                  </a>
                </div> */}
                <hr className="mt-1 mb-1 y" style={{ borderColor: "gray" }}  />
                <div className="list-meta2 d-flex   justify-content-between align-items-center">
                  <div >
                 
                    Price from{" "}
                    <h6 className="fw-semibold pb-0 mb-0 ">
                      {Number(listing.price.split("$")[1]) === 0
                        ? "Ask for price"
                        : "AED " +
                          Number(listing.price.split("$")[1]).toLocaleString()}
                    </h6>
                  </div>
                  <div>
                  
                    Completion <h6 className="fw-semibold pb-0 mb-0 ">

                      {formatCompletionDate(listing?.completion_datetime)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeaturedListings;
