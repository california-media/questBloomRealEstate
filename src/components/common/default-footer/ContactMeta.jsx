import adminApi from "@/api/adminApi";
import React, { useEffect, useState } from "react";

const ContactMeta = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        // Fetch all needed configuration at once
        const response = await adminApi.get(
          "/theme-options/general?keys=hotline,email,address"
        );

        if (response.data.success) {
          setContactInfo([
            {
              title: "Total Free Customer Care",
              phone: response.data.data.hotline || "+971 (56) 406 5672",
              phoneLink: `tel:${
                response.data.data.hotline?.replace(/\D/g, "") || "971564065672"
              }`,
            },
            {
              title: "Need Live Support?",
              mail: response.data.data.email || "Info@questbloom.ae",
              mailLink: `mailto:${
                response.data.data.email || "Info@questbloom.ae"
              }`,
            },
            {
              title: "We are located at",
              address:
                response.data.data.address ||
                "Office 1702, 17th Floor, Bayswater, Business Bay, P.O. Box 113225, Dubai, UAE",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
        // Fallback to default values if API fails
        setContactInfo([
          {
            title: "Total Free Customer Care",
            phone: "+971 (56) 406 5672",
            phoneLink: "tel:+9710564065672",
          },
          {
            title: "Need Live Support?",
            mail: "Info@questbloom.ae",
            mailLink: "mailto:Info@questbloom.ae",
          },
          {
            title: "We are located at",
            address:
              "Office 1702, 17th Floor, Bayswater, Business Bay, P.O. Box 113225, Dubai, UAE",
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

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfo.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
            {contact.address && (
              <h6 className="info-mail">
                <p className="text-white">{contact.address}</p>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
