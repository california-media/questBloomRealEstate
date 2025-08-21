import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

const DefaultHeader = ({ menuItems, error }) => {
  const [navbar, setNavbar] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    // Measure header height on mount and resize
    const measureHeader = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);

    const changeBackground = () => {
      const shouldBeSticky = window.scrollY >= 130;
      if (!shouldBeSticky) {
        if (window.scrollY === 0) setNavbar(false);
      } else setNavbar(shouldBeSticky);
    };

    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("resize", measureHeader);
    };
  }, [navbar]);

  return (
    <>
      <div style={{ height: navbar ? `${headerHeight}px` : "0px" }} />

      <header
        ref={headerRef}
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu`}
        style={{
          position: navbar ? "fixed" : "static",
          top: navbar ? "0" : "auto",
          left: navbar ? "0" : "auto",
          right: navbar ? "0" : "auto",
          zIndex: navbar ? "9999" : "auto",
          width: "100%",
          transform: navbar ? "translateY(0)" : "none",
          animation: navbar ? "slideInDown 0.3s ease-out" : "none",
          transition: navbar ? "all 0.1s ease-out" : "all 0.1s ease-out",
        }}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1 maxw1600 ">
            <div className="row align-items-center justify-content-between  ">
              <div className="col-auto ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" to="/">
                      <img
                        style={{ height: "50px" }}
                        src="/images/QMC-logo.webp"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img
                        style={{ height: "50px" }}
                        src="/images/QMC-logo.webp"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu menuItems={menuItems} error={error} />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {/* <a
                    href="#"
                    className="login-info d-flex align-items-cente"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"
                  >
                    <i className="far fa-user-circle fz16 me-2" />{" "}
                    <span className="d-none d-xl-block">Login / Register</span>
                  </a> */}
                  {/* <Link
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    to="/dashboard-add-property"
                  >
                    Add Property
                    <i className="fal fa-arrow-right-long" />
                  </Link> */}
                  {/* <a
                    className="sidemenu-btn m20 filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <img
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}
    </>
  );
};

export default DefaultHeader;
