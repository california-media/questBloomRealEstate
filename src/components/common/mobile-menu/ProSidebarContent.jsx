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
    if ("home" == pathname.split("/")[1]) {
      setTopMenu("home");
    }
    if ("off-plan" == pathname.split("/")[1]) {
      setTopMenu("listing");
    }
    if ("contact" == pathname.split("/")[1]) {
      setTopMenu("contactus");
    }

    if ("about" == pathname.split("/")[1]) {
      setTopMenu("whoweare");
    }

    if ("agents" == pathname.split("/")[1]) {
      setTopMenu("agents");
    }

    if ("buy" == pathname.split("/")[1]) {
      setTopMenu("buy");
    }
    if ("listings" == pathname.split("/")[1]) {
      setTopMenu("listings");
    }
    if ("rent" == pathname.split("/")[1]) {
      setTopMenu("rent");
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
              to={"/home"}
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
                to={"/off-plan"}
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
                to={"/buy"}
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
                to={"/listings"}
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
                to={"/rent"}
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
                to={"/agents"}
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
                to={"/about"}
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
                to={"/contact"}
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
