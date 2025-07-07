import { Link } from "react-router-dom";
import ContactMeta from "./ContactMeta";
import AppWidget from "./AppWidget";
import Social from "./Social";
import Subscribe from "./Subscribe";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";
import adminApi, { adminBaseUrl } from "@/api/adminApi";
import { useEffect, useState } from "react";

const Footer = () => {
  const [logos, setLogos] = useState({
    whiteLogo: "/images/Questrealstatewhite.svg",
  });

  // Fetch theme images on component mount
  useEffect(() => {
    const fetchThemeImages = async () => {
      try {
        const { data } = await adminApi.get("/media/theme-images");

        setLogos((prev) => ({
          whiteLogo: data.logo_white || prev.whiteLogo,
        }));
      } catch (error) {
        console.error("Failed to fetch theme images:", error);
      }
    };

    fetchThemeImages();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row gx-5 ">
          <div className="col-lg-5">
            <div className="footer-widget mb-4 mb-lg-5">
              <Link className="header-logo logo1" to="/">
                <img
                  className="mb40"
                  style={{ height: "50px" }}
                  src={adminBaseUrl + logos.whiteLogo}
                  alt="Header Logo"
                />
              </Link>
              <ContactMeta />
              {/* <AppWidget /> */}
              {/* <div className="social-widget">
                <h6 className="text-white mb20">Follow us on social media</h6>
                <Social />
              </div> */}
            </div>
          </div>
          {/* End .col-lg-5 */}

          <div className="col-lg-7">
            <div className="footer-widget mb-4 mb-lg-5">
              <div className="row justify-content-between ">
                <MenuWidget />
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      <Copyright />
      {/* End copyright */}
    </>
  );
};

export default Footer;
