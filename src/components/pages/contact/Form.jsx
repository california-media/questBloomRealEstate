import api from "@/api/axios";
import React, { useState } from "react";
const isDev = import.meta.env.DEV;
const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = isDev
        ? await fetch("/contact-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr",
            },
            body: JSON.stringify({
              subject: "New Contact Form Submission",
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              notes: formData.notes,
            }),
          })
        : await api.post("/send-contact-email", {
            subject: "New Contact Form Submission",
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            notes: formData.notes,
          });

      const data = isDev ? await response.json() : response.data;

      if (data.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for contacting us!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          notes: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Submission failed",
        });
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Your First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">Notes</label>
            <textarea
              name="notes"
              cols={30}
              rows={4}
              placeholder="Your notes..."
              value={formData.notes}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="d-grid">
            <button
              type="submit"
              style={{
                backgroundColor: "transparent",
                border: "1px solid black",
                cursor: "pointer",
                borderRadius: "12px",
                padding: "12px 25px",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "15px",
                fontStyle: "normal",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, Helvetica, sans-serif',
                outline: "none",
                WebkitAppearance: "none", // iOS fix
                color: "black", // ensure visible text
                display: "inline-flex", // prevents text collapse
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
              <i
                className="fal ms-2 fa-arrow-right-long"
                style={{ transform: "rotate(-45deg)" }}
              />
            </button>
          </div>
          {submitStatus && (
            <div
              className={`mt-3 alert alert-${
                submitStatus.success ? "success" : "danger"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
