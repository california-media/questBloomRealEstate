import React from "react";

const testimonials = [
  {
    id: "1st",
    imageSrc: "/images/testimonials/testi-1.webp",
    text: "Questbloom Real Estate exceeded expectations, finding us a dream home in Dubai’s iconic Downtown.",
    name: "Ali Bin Saleh",
    designation: "Customer",
  },
  {
    id: "2nd",
    imageSrc: "/images/testimonials/testi-2.webp",
    text: "Unmatched service and luxury properties – Questbloom made our Dubai home search effortless and enjoyable.",
    name: "Nour Mohamed",
    designation: "Customer",
  },
  {
    id: "third",
    imageSrc: "/images/testimonials/testi-3.webp",
    text: "Questbloom Real Estate's expertise and dedication led us to the perfect home in Dubai Marina.",
    name: "Lina Kamal-Eddin",
    designation: "Customer",
  },

  // Add more testimonial objects if needed
];

const Testimonial = () => {
  return (
    <>
      <div className="tab-content" id="pills-tabContent">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`tab-pane fade ${
              testimonial.id === "2nd" ? "show active" : ""
            }`}
            id={`pills-${testimonial.id}`}
            role="tabpanel"
            aria-labelledby={`pills-${testimonial.id}-tab`}
          >
            <div className="testi-content text-center">
              <span className="icon fas fa-quote-left" />
              <h4 className="testi-text">{testimonial.text}</h4>
              <h6 className="name">{testimonial.name}</h6>
              <p className="design">{testimonial.designation}</p>
            </div>
          </div>
        ))}
      </div>
      {/* End tab-content */}
      <div className="tab-list position-relative">
        <ul
          className="nav nav-pills justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          {testimonials.map((testimonial) => (
            <li className="nav-item" role="presentation" key={testimonial.id}>
              <button
                className={`nav-link ${
                  testimonial.id === "1st" ? "ps-0" : ""
                } ${testimonial.id === "2nd" ? "active" : ""} ${
                  testimonial.id === "5th" ? "pe-0" : ""
                }`}
                id={`pills-${testimonial.id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${testimonial.id}`}
                type="button"
                role="tab"
                aria-controls={`pills-${testimonial.id}`}
                aria-selected={testimonial.id === "2nd" ? "true" : "false"}
              >
                <img
                  style={{ width: "70px", height: "71px" }}
                  src={testimonial.imageSrc}
                  alt=""
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Testimonial;
