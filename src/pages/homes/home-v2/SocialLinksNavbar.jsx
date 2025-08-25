import React from "react";

const SocialLinksNavbar = () => {
  return (
    <div className="social-links-navbar">
      <a
        target="_blank"
        href={"https://www.facebook.com/questbloomrealestate"}
        className="social-link-navbar"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        target="_blank"
        href={"https://www.instagram.com/questbloomrealestate"}
        className="social-link-navbar"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        target="_blank"
        href={"https://www.tiktok.com/@questbloomrealestate"}
        className="social-link-navbar"
        onClick={(e) => e.stopPropagation()}
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
};

export default SocialLinksNavbar;
