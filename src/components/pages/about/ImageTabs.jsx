import { adminBaseUrl } from "@/api/adminApi";
import React, { useEffect, useState } from "react";

const ImageTabs = ({ architecture, lobby, interior }) => {
  const [activeTab, setActiveTab] = useState("architecture");
  const [transitioning, setTransitioning] = useState(false);

  const tabs = [
    {
      id: "architecture",
      label: "Architecture",
      images: architecture?.map((image) => image.url) || [],
    },
    {
      id: "lobby",
      label: "Lobby",
      images: lobby?.map((image) => image.url) || [],
    },
    {
      id: "interior",
      label: "Interior",
      images: interior?.map((image) => image.url) || [],
    },
  ].filter((tab) => tab.images.length > 0); // Only show tabs with images

  useEffect(() => {
    // Preload all images from all tabs
    const preloadImages = () => {
      tabs.forEach((tab) => {
        tab.images.forEach((imageUrl) => {
          const img = new Image();
          img.src = imageUrl;
        });
      });
    };

    preloadImages();
  }, [architecture, lobby, interior]); // Dependencies: re-run when these props change

  const handleTabChange = (tabId) => {
    if (activeTab !== tabId && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setTransitioning(false);
      }, 300); // Match this with your CSS transition duration
    }
  };

  // If no tabs with images, return null or some placeholder
  if (tabs.length === 0) {
    return null;
  }

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container  ">
        <div className="row">
          <div className="col-12  px-0">
            {/* Tabs Navigation */}
            <div className="d-flex flex-wrap gap-2 ">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`btn  d-flex align-items-center gap-2 px-3 py-2 border-0 rounded-pill fw-medium ${
                    activeTab === tab.id ? "text-white" : "text-dark bg-white"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? "#797631" : "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    minHeight: "44px",
                  }}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area with fade animation */}
            <div
              className={`row  justify-content-center align-items-center fade-transition ${
                transitioning ? "fade-out" : "fade-in"
              }`}
            >
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 pr-0 ">
                {activeTabData?.images.map((image, i) => (
                  <div className="col " key={i}>
                    <img
                      src={`${image}`}
                      className="card-img-top img-fluid rounded "
                      alt={`${activeTabData.label} view ${i + 1}`}
                      style={{
                        height: "200px",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .fade-transition {
          transition: opacity 0.3s ease;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .fade-out {
          animation: fadeOut 0.3s ease forwards;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        .btn:focus {
          box-shadow: 0 0 0 0.2rem rgba(108, 92, 231, 0.25);
        }
      `}</style>
    </div>
  );
};

export default ImageTabs;
