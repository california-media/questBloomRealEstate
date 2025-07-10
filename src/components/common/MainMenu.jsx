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

const MainMenu = () => {
  const { pathname } = useLocation();
  const [topMenu, setTopMenu] = useState("home");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await adminApi.get("/appearance/menus", {
          params: {
            type: "header",
          },
        });

        setMenuItems(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");
        // Fallback to default menu structure if API fails
        setMenuItems([
          { id: 1, name: "Home", page: "Home" },
          { id: 2, name: "Off-Plan", page: "Off-Plan" },
          { id: 3, name: "Buy", page: "Buy" },
          { id: 4, name: "Listings", page: "Listings" },
          { id: 5, name: "Rent", page: "Rent" },
          { id: 6, name: "Agents", page: "Agents" },
          { id: 7, name: "Who We Are", page: "Who we are" },
          { id: 8, name: "Contact Us", page: "Contact Us" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

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
