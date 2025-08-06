import adminApi from "@/api/adminApi";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { pdf } from "@react-pdf/renderer";
import OffPlanPropertyPDF from "../single-v5/OffPlanPropertyPDF";

const isDev = import.meta.env.DEV;

const ReviewBoxForm = ({ property, prefixedId, downloadPDF, contactInfo }) => {
  const [enquiryText, setEnquiryText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
  });
  const handlePrintClick = async () => {
    try {
      const blob = await pdf(
        <OffPlanPropertyPDF
          property={property}
          qbc_email={contactInfo?.email}
          qbc_phone={contactInfo?.hotline}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${property.name}_brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    setEnquiryText(
      `I would like to submit an Enquiry about ${
        property?.name || "Property 1"
      }`
    );
  }, [property]);

  const validateForm = (formData) => {
    const newErrors = {};
    let isValid = true;

    if (!formData.get("name")?.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.get("email")?.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.get("email"))) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.get("phone")?.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.get("enquiry")?.trim()) {
      newErrors.enquiry = "Enquiry text is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!validateForm(formData)) {
      return;
    }

    const enquiryData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phonenumber: formData.get("phone"),
      description: `${property?.name} - ${prefixedId}\n${formData.get(
        "enquiry"
      )}`,
      status: "14",
      source: "9",
      assigned: "129",
    };
    formData.append("status", "14");
    formData.append("source", "9");
    formData.append("assigned", "129");

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });
    console.log(enquiryData);
    try {
      // Send to CRM API
      const crmResponse = await fetch(isDev ? "/crm/api/leads" : "/api/leads", {
        method: "POST",
        headers: {
          ...(isDev
            ? {
                Authorization:
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoid2ViX2FwaV9rZXkiLCJuYW1lIjoid2ViX2FwaV9rZXkiLCJBUElfVElNRSI6MTc1MDc0NTU1MH0.bArzQAQZrOua-U4TCe0W3PQvsUvBSDNt6QKHbS1FkpA",
              }
            : {
                "Content-Type": "application/json",
                Authorization:
                  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoid2ViX2FwaV9rZXkiLCJuYW1lIjoid2ViX2FwaV9rZXkiLCJBUElfVElNRSI6MTc1MDc0NTU1MH0.bArzQAQZrOua-U4TCe0W3PQvsUvBSDNt6QKHbS1FkpA",
              }),
        },
        body: isDev ? formData : JSON.stringify(enquiryData),
      });

      const crmData = await crmResponse.json();

      if (crmResponse.ok && crmData.status) {
        // Send email notification to admin
        const { status, source, assigned, ...cleanedEnquiry } = enquiryData;

        ////work around from vercel API until cors POST error on laravel API is not resolved

        const emailResponse = isDev
          ? await fetch("/leads-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr",
              },
              body: JSON.stringify({
                subject: `New Enquiry: ${property?.name || "Property Enquiry"}`,
                lead: cleanedEnquiry,
              }),
            })
          : await api.post("/send-crm-lead-email", {
              subject: `New Enquiry: ${property?.name || "Property Enquiry"}`,
              lead: cleanedEnquiry,
            });
        // await adminApi.post("/crm-leads-email", {
        //   subject: `New Enquiry: ${property?.name || "Property Enquiry"}`,
        //   lead: cleanedEnquiry,
        // });

        // Handle non-OK responses for fetch
        if (isDev && !emailResponse.ok) {
          const errorData = await emailResponse.json();
          throw {
            isHttpError: true,
            status: emailResponse.status,
            data: errorData,
          };
        }
        const emailResult = isDev
          ? await emailResponse.json()
          : emailResponse.data;

        // Handle business logic errors (success: false)
        if (!emailResult.success) {
          throw {
            isBusinessError: true,
            data: emailResult,
          };
        }
        ///print PDF if download form
        if (downloadPDF) handlePrintClick();
        setSubmitStatus({
          success: true,
          message: "Enquiry submitted successfully!",
        });
        event.target.reset();
        setEnquiryText(
          `I would like to submit an Enquiry about ${
            property?.name || "Property 1"
          }`
        );
      } else {
        setSubmitStatus({
          success: false,
          message:
            crmData.message || "Failed to submit enquiry. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);

      // Handle different error types
      let errorMessage = "An error occurred while submitting your enquiry.";

      if (error.isHttpError) {
        // HTTP error (500, 422 etc.)
        errorMessage = error.data.message || `Server error (${error.status})`;
      } else if (error.isBusinessError) {
        // Business logic error (success: false)
        errorMessage = error.data.message || "Failed to process your enquiry";
      } else if (error.response) {
        // Axios error structure
        errorMessage = error.response.data.message || "API request failed";
      }

      setSubmitStatus({
        success: false,
        message: errorMessage,
        details: error.data?.errors, // Include validation errors if available
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comments_form mt10" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter Name"
              required
            />
            {/* Name Error - Add right after the input */}
            {errors.name && (
              <div
                className="invalid-feedback"
                dangerouslySetInnerHTML={{ __html: errors.name }}
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter Email"
              required
            />
            {/* Email Error - Add right after the input */}
            {errors.email && (
              <div
                className="invalid-feedback"
                dangerouslySetInnerHTML={{ __html: errors.email }}
              />
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Phone</label>
            <PhoneInput
              inputClass={`form-control ${errors.phone ? "is-invalid" : ""}`}
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
            {/* Phone Error - Add right after the PhoneInput */}
            {errors.phone && (
              <div
                className="invalid-feedback"
                dangerouslySetInnerHTML={{ __html: errors.phone }}
              />
            )}
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Notes</label>
            <textarea
              className={`pt15 form-control ${
                errors.enquiry ? "is-invalid" : ""
              }`}
              name="enquiry"
              style={{ minHeight: "200px" }}
              rows={8}
              placeholder="Write your enquiry"
              onChange={(e) => setEnquiryText(e.target.value)}
              value={enquiryText}
              required
            />
            {/* Enquiry Error - Add right after the textarea */}
            {errors.enquiry && (
              <div
                className="invalid-feedback"
                dangerouslySetInnerHTML={{ __html: errors.enquiry }}
              />
            )}
          </div>

          {/* Submission Status Message - Add before the submit button */}
          {submitStatus.message && (
            <div
              className={`alert ${
                submitStatus.success ? "alert-success" : "alert-danger"
              }`}
              dangerouslySetInnerHTML={{ __html: submitStatus.message }}
            />
          )}

          <button
            type="button"
            onClick={() => handlePrintClick()}
            className="ud-btn btn-white2"
            disabled={property === null || isSubmitting}
          >
            {isSubmitting ? (
              <div className="d-flex align-items-center gap-2">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
                <span>
                  {downloadPDF ? "Downloading PDF" : "Submitting Enquiry"}
                </span>
              </div>
            ) : (
              <>
                {downloadPDF ? "Download PDF" : "Submit Enquiry"}
                <i className="fal fa-arrow-right-long" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewBoxForm;
