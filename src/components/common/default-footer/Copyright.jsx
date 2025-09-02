import adminApi from "@/api/adminApi";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [copyrightText, setCopyrightText] = useState(
    "© Quest Bloom Real Estate LLC - All rights reserved"
  );
  const [loading, setLoading] = useState(false);

  const footerMenuItems = [
    {
      label: "Privacy",
      link: "#",
    },
    {
      label: "Terms",
      link: "#",
    },
    {
      label: "Sitemap",
      link: "#",
    },
  ];

  useEffect(() => {
    const fetchCopyright = async () => {
      try {
        setLoading(true);
        const response = await adminApi.get(
          "/theme-options/general?keys=copyright"
        );

        if (response.data.success && response.data.data.copyright) {
          setCopyrightText(response.data.data.copyright);
        }
      } catch (error) {
        console.error("Error fetching copyright text:", error);
        // Keep default copyright text if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchCopyright();
  }, []);

  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center text-lg-start">
            <p className="copyright-text text-gray ff-heading">
              {copyrightText}
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6">
          <div className="text-center text-lg-end">
            <p className="footer-menu ff-heading text-gray">
              {footerMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a className="text-gray" href={item.link}>
                    {item.label}
                  </a>
                  {index !== footerMenuItems.length - 1 && " · "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
    </div>
  );
};

export default Footer;
