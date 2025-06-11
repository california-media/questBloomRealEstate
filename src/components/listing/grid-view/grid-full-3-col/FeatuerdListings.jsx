import {
  ChartNoAxesCombined,
  Check,
  CircleDot,
  Clock,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => (
        <div
          className={` ${
            colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
          }  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }
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
                {Number(listing.price.split("$")[1]) === 0
                  ? "Ask for price"
                  : "AED " +
                    Number(listing.price.split("$")[1]).toLocaleString()}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link to={`/off-plan/${listing.id}`}>{listing.title}</Link>
              </h6>
              <p className="list-text">{listing.location}</p>
              <div className="list-meta d-flex align-items-center">
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
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <div>
                  <ChartNoAxesCombined
                    className="mb-1"
                    size={16}
                    color="gray"
                  />{" "}
                  {listing.sale_status}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
