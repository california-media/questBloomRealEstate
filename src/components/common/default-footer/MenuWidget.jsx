import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const MenuWidget = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await adminApi.get("/appearance/menus", {
          params: {
            type: "footer",
          },
        });

        // Transform API data to quickLinks format
        const transformedLinks = (response.data || []).map((menuItem) => ({
          label: menuItem.name,
          href: SITE_PAGES[menuItem.page] || "#",
          id: menuItem.id,
        }));

        setQuickLinks(transformedLinks);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");

        // Fallback to default menu structure if API fails
        setQuickLinks([
          { label: "Home", href: "/home" },
          { label: "Off-Plan", href: "/off-plan" },
          { label: "Buy", href: "/buy" },
          { label: "Listings", href: "/listings" },
          { label: "Rent", href: "/rent" },
          { label: "Agents", href: "/agents" },
          { label: "Who We Are", href: "/about" },
          { label: "Contact Us", href: "/contact" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (error) {
    return (
      <div className="col-auto">
        <div className="link-style1 mb-3">
          <h6 className="text-white mb25">Quick Links</h6>
          <p className="text-white">Error loading menu</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-auto">
        <div className="link-style1 mb-3">
          <h6 className="text-white mb25">Quick Links</h6>
          <ul className="ps-0 d-flex flex-wrap">
            {quickLinks.map((link, index) => (
              <li key={link.id || index} style={{ width: "50%" }}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuWidget;
