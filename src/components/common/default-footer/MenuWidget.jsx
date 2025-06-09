import React from "react";

const MenuWidget = () => {
  const quickLinks = [
    { label: "Home", href: "/home-v2" },
    { label: "Off-Plan", href: "/grid-full-3-col" },
    { label: "Buy", href: "#" },
    { label: "Listings", href: "#" },
    { label: "Rent", href: "#" },
    { label: "Agents", href: "#" },
    { label: "Who We Are", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <>
      <div className="col-auto">
        <div className="link-style1 mb-3">
          <h6 className="text-white mb25">Quick Links</h6>
          <ul className="ps-0 d-flex flex-wrap">
            {quickLinks.map((link, index) => (
              <li key={index} style={{ width: "50%" }}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuWidget;
