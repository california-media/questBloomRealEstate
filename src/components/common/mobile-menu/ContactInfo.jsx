import adminApi from "@/api/adminApi";
import React, { useState, useEffect } from "react";

const ContactInfo = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        // Fetch all needed configuration at once
        const response = await adminApi.get(
          "/theme-options/general?keys=hotline,email"
        );

        if (response.data.success) {
          setContactInfo([
            {
              id: 1,
              title: "Customer Care",
              phone: response.data.data.hotline || "+971 4 529 9247",
              phoneHref: `tel:${
                response.data.data.hotline?.replace(/\D/g, "") || "971564065672"
              }`,
            },
            {
              id: 2,
              title: "Need Live Support?",
              email: response.data.data.email || "info@questrealestate.ae",
              emailHref: `mailto:${
                response.data.data.email || "info@questrealestate.ae"
              }`,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
        // Fallback to default values if API fails
        setContactInfo([
          {
            id: 1,
            title: "Customer Care",
            phone: "+971 4 529 9247",
            phoneHref: "tel:+9710564065672",
          },
          {
            id: 2,
            title: "Need Live Support?",
            email: "info@questrealestate.ae",
            emailHref: "mailto:info@questrealestate.ae",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">Loading contact information...</div>
    );
  }

  if (!contactInfo) {
    return null; // or some error message
  }

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-12" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
