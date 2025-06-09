import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
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
        "Office 1004, 10th Floor, Bayswater, Business Bay, P.O. Box 113225, Dubai, UAE",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
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
