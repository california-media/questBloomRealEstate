import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import adminApi from "@/api/adminApi";

// Enum mapping for menu pages to routes
const SITE_PAGES = {
  Home: "/home",
  Agents: "/agents",
  "Who we are": "/about",
  Listings: "/listings",
  "Off-Plan": "/off-plan",
  Buy: "/buy",
  Rent: "/rent",
  "Contact Us": "/contact",
};

// Reverse mapping for route to menu key
const ROUTE_TO_MENU_KEY = {
  "/home": "home",
  "/off-plan": "listing",
  "/contact": "contactus",
  "/about": "whoweare",
  "/agents": "agents",
  "/buy": "buy",
  "/listings": "listings",
  "/rent": "rent",
};

const MainMenu = ({ menuItems, error }) => {
  const { pathname } = useLocation();
  const [topMenu, setTopMenu] = useState("home");

  // Set active menu based on current pathname
  useEffect(() => {
    const currentRoute = "/" + pathname.split("/")[1];
    const menuKey = ROUTE_TO_MENU_KEY[currentRoute];
    if (menuKey) {
      setTopMenu(menuKey);
    }
  }, [pathname]);

  // Get menu key for active state comparison
  const getMenuKey = (page) => {
    const route = SITE_PAGES[page];
    return ROUTE_TO_MENU_KEY[route] || page.toLowerCase().replace(/\s+/g, "");
  };

  // Get route path from page enum value
  const getRoutePath = (page) => {
    return SITE_PAGES[page] || "/";
  };

  if (error) {
    return (
      <ul className="ace-responsive-menu">
        <li>Error loading menu</li>
      </ul>
    );
  }

  return (
    <>
      <style>{`
        .title:hover {
          // color: #a3a075; 
        }
      `}</style>
      <ul className="ace-responsive-menu">
        {menuItems.map((menuItem) => {
          const menuKey = getMenuKey(menuItem.page);
          const routePath = getRoutePath(menuItem.page);
          const isActive = topMenu === menuKey;

          return (
            <li key={menuItem.id} className="">
              <div
                style={{
                  borderRadius: "60px",
                  textAlign: "center",
                  padding: "18px 20px 18px 5px",
                }}
              >
                <Link
                  className={isActive ? "title menuActive" : "title"}
                  id="menu-title-hover"
                  to={routePath}
                >
                  {menuItem.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MainMenu;
