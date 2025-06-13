import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ReviewBoxForm = ({ property }) => {
  const [enquiryText, setEnquiryText] = useState("");

  useEffect(() => {
    setEnquiryText(
      `I would like to submit an Enquiry about ${
        property?.name || "Property 1"
      }`
    );
  }, [property]);
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#797631"
          : isHovered
          ? "#DDE5C2"
          : isFocused
          ? "#DDE5C2"
          : undefined,
      };
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enquiryData = {
      email: formData.get("email"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      enquiry: formData.get("enquiry"),
      propertyId: property?.id,
    };

    // You can now use enquiryData for your API call
    console.log("Form data:", enquiryData);

    // Add your API call here
    // Example:
    // submitEnquiry(enquiryData).then(...)
  };

  return (
    <form className="comments_form mt10" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              required
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Phone</label>
            <PhoneInput
              inputClass="form-control"
              containerClass="react-tel-input"
              country={"ae"}
              inputStyle={{
                width: "100%",
                height: "calc(2.25em + 1rem + 2px)",
                padding: "0.5rem 1rem 0.5rem 58px",
                fontSize: "1rem",
                lineHeight: "1.5",
                borderRadius: "0.25rem",
              }}
              buttonStyle={{
                height: "100%",
                padding: "0 0 0 8px",
                borderRadius: "0.25rem 0 0 0.25rem",
              }}
              dropdownStyle={{
                borderRadius: "0.25rem",
              }}
              inputProps={{
                name: "phone",
                required: true,
              }}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Notes</label>
            <textarea
              className="pt15 form-control"
              name="enquiry"
              style={{ minHeight: "200px" }}
              rows={8}
              placeholder="Write your enquiry"
              onChange={(e) => setEnquiryText(e.target.value)}
              value={enquiryText}
              required
            />
          </div>
          <button type="submit" className="ud-btn btn-white2">
            Submit Enquiry
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default ReviewBoxForm;
