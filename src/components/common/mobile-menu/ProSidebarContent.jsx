import mobileMenuItems from "../../../data/mobileMenuItems";
import { isParentActive } from "../../../utilis/isMenuActive";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";

const ProSidebarContent = () => {
  const { pathname } = useLocation();
  const [topMenu, setTopMenu] = useState("");

  useEffect(() => {
    if ("home-v2" == pathname.split("/")[1]) {
      setTopMenu("home");
    }
    if ("grid-full-3-col" == pathname.split("/")[1]) {
      setTopMenu("listing");
    }

    // blogItems.forEach((elm) => {
    //   if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //     setTopMenu("blog");
    //   }
    // });
    // pageItems.forEach((elm) => {
    //   if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //     setTopMenu("pages");
    //   }
    // });
    // propertyItems.forEach((item) =>
    //   item.subMenuItems.forEach((elm) => {
    //     if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //       setTopMenu("property");
    //       setSubmenu(item.label);
    //     }
    //   })
    // );
  }, [pathname]);
  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <Link
              className={topMenu == "home" ? "title menuActive" : "title"}
              to={"/home-v2"}
            >
              Home
            </Link>
            {/* <span className="arrow"></span> */}
          </a>
          {/* Level Two*/}
        </li>
        {/* End homeItems */}

        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "listing" ? "title menuActive" : "title"}
                to={"/grid-full-3-col"}
              >
                Off-Plan
              </Link>
            </span>
          </a>
        </li>

        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "buy" ? "title menuActive" : "title"}
                to={"#"}
              >
                Buy
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>
        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "offplan" ? "title menuActive" : "title"}
                to={"#"}
              >
                Listings
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>

        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "luxury" ? "title menuActive" : "title"}
                to={"#"}
              >
                Rent
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>
        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "agents" ? "title menuActive" : "title"}
                to={"#"}
              >
                Agents
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>

        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={topMenu == "whoweare" ? "title menuActive" : "title"}
                to={"#"}
              >
                Who We Are
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>
        <li className=" pl30 py10">
          <a className="list-item" href="#">
            <span>
              <Link
                className={
                  topMenu == "contactus" ? "title menuActive" : "title"
                }
                to={"#"}
              >
                Contact Us
              </Link>
            </span>
            {/* <span className="arrow"></span> */}
          </a>
        </li>
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
