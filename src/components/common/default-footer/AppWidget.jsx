import React from "react";

const AppWidget = () => {
  const appList = [
    {
      icon: "fab fa-apple fz30 text-white",
      text: "Download on the",
      title: "Apple Store",
      link: "#",
    },
    {
      icon: "fab fa-google-play fz30 text-white",
      text: "Get it on",
      title: "Google Play",
      link: "#",
    },
  ];

  return (
    <div className="app-widget">
      <h5 className="title text-white mb10">About Site</h5>
      <div className="row mb-4 mb-lg-5">
        <p className="info-title">
          At Questbloom Real Estate, we’re more than just agents – we’re your
          partners in finding the perfect home tailored to your lifestyle.
        </p>
      </div>
    </div>
  );
};

export default AppWidget;
