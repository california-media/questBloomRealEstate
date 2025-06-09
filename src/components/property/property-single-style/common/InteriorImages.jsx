import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const InteriorImages = ({ interior }) => {
  const images = interior || [];

  if (!images.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No interior images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-md-12">
        <Gallery>
          <ul className="mb20 ps-0 d-flex flex-wrap">
            {images.map((image, index) => (
              <li className="list-inline-item mb15 me15" key={index}>
                <Item
                  original={image.url}
                  thumbnail={image.url}
                  width={1100}
                  height={700}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      role="button"
                      src={image.url}
                      alt={`Interior image ${index + 1}`}
                      className="interior-thumb"
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: "2px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.border = "2px solid #007bff";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.border = "2px solid transparent";
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  )}
                </Item>
              </li>
            ))}
          </ul>
        </Gallery>
      </div>

      <div className="col-md-12">
        <div className="position-relative bdrb1 pt30 pb20">
          <div className="text-muted">
            <i className="fas fa-images me-2" />
            {images.length} interior image{images.length !== 1 ? "s" : ""}{" "}
            available
          </div>
        </div>
      </div>
    </>
  );
};

export default InteriorImages;
