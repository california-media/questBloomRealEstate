// import {
//   homeItems,
//   blogItems,
//   listingItems,
//   propertyItems,
//   pageItems,
// } from "@/data/navItems";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { pathname } = useLocation();

  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");

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

  // const handleActive = (link) => {
  //   if (link.split("/")[1] == pathname.split("/")[1]) {
  //     return "menuActive";
  //   }
  // };
  return (
    <ul className="ace-responsive-menu">
      <li className="">
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
        {/* <ul className="sub-menu">
          {homeItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End homeItems */}

      <li className="">
        <a className="list-item" href="#">
          <span>
            <Link
              className={topMenu == "listing" ? "title menuActive" : "title"}
              to={"/off-plan"}
            >
              Off-Plan
            </Link>
          </span>
          {/* <span className="arrow"></span> */}
        </a>
        {/* <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(submenuItem.href)}`}
                      to={submenuItem.href}
                    >
                      {submenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </li>

      <li className="">
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
      <li className="">
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

      <li className="">
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
      <li className="">
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

      <li className="">
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
      <li className="">
        <a className="list-item" href="#">
          <span>
            <Link
              className={topMenu == "contactus" ? "title menuActive" : "title"}
              to={"/contact"}
            >
              Contact Us
            </Link>
          </span>
          {/* <span className="arrow"></span> */}
        </a>
      </li>

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span
            className={topMenu == "property" ? "title menuActive" : "title"}
          >
            Property
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {propertyItems.map((item, index) => (
            <li key={index} className="dropitem">
              <a href="#">
                <span
                  className={
                    submenu == item.label ? "title menuActive" : "title"
                  }
                >
                  {item.label}
                </span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                {item.subMenuItems.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(subMenuItem.href)}`}
                      to={subMenuItem.href}
                    >
                      {subMenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>

      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "blog" ? "title menuActive" : "title"}>
            Blog
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {blogItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "pages" ? "title menuActive" : "title"}>
            Pages
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {pageItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}
    </ul>
  );
};

export default MainMenu;
