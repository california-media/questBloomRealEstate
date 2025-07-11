import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import adminApi from "@/api/adminApi";
import { Sidebar, Menu } from "react-pro-sidebar";

// Enum mapping for menu pages to routes (same as in MainMenu)
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

// Reverse mapping for route to menu key (same as in MainMenu)
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

const ProSidebarContent = ({ menuItems, error }) => {
  const { pathname } = useLocation();
  const [topMenu, setTopMenu] = useState("");

  // Set active menu based on current pathname (similar to MainMenu)
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

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {menuItems.menuItems.map((menuItem) => {
          const menuKey = getMenuKey(menuItem.page);
          const routePath = getRoutePath(menuItem.page);
          const isActive = topMenu === menuKey;

          return (
            <li key={menuItem.id} className="pl30 py10">
              <Link
                className={isActive ? "title menuActive" : "title"}
                to={routePath}
              >
                {menuItem.name}
              </Link>
            </li>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
