import React, { useState } from "react";

const WealthManagementTabs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const tabs = [
    // { id: "who", label: "Who We Are", icon: "💎" },
    { id: "mission", label: "Our Mission", icon: "💎" },
    { id: "vision", label: "Our Vision", icon: "💎" },
    { id: "strength", label: "Our Strengths", icon: "💎" },
    // { id: "choose", label: "Why Choose Us", icon: "💎" },
  ];

  const tabContent = {
  
    mission: {
      title: "Our Mission",
      paragraph:
        "At Questbloom Real Estate, our mission is to guide you on your journey to finding the perfect home in Dubai. We prioritize unparalleled service, expertise, and personalized attention for every client. Our goal is to redefine the real estate experience by putting your needs first and foremost. With a commitment to excellence, we strive to be your trusted partner in navigating the dynamic Dubai real estate market. Whether you're in search of a luxurious waterfront villa, a chic urban apartment, or a serene beachfront retreat, we're here to make your dreams come true. Experience the difference with Questbloom Real Estate – where our mission is to guide you every step of the way towards your dream home in Dubai.",
    
    },
    vision: {
      title: "Our Vision",
      paragraph:
        "At Questbloom Real Estate, our vision is to redefine the standard of excellence in Dubai's real estate market. We aim to be the premier choice for clients seeking unparalleled service, expertise, and personalized attention. Our vision encompasses creating lasting relationships built on trust, transparency, and integrity. We strive to exceed expectations by consistently delivering exceptional results and guiding clients towards their dream homes. With a forward-thinking approach and a commitment to innovation, we envision a future where every client's real estate journey is seamless, rewarding, and unforgettable. Experience our vision come to life at Questbloom Real Estate – where your dreams become reality.",
  
    },
    strength: {
      title: "Our Strengths",
      paragraph:
        "At Questbloom Real Estate, our strengths lie in our unwavering commitment to excellence, unparalleled market expertise, and personalized service. With a deep understanding of Dubai’s real estate landscape, we offer invaluable insights and guidance to our clients. Our dedication to exceeding expectations ensures seamless transactions and exceptional results. Trust, integrity, and transparency are the cornerstones of our approach, fostering lasting relationships with our clients. From luxury waterfront properties to urban apartments, our diverse portfolio showcases our ability to cater to every need. Experience the strength of Questbloom Real Estate – where your real estate goals become reality.",
   
    },
   
  };

  return (
    <div
      className="container-fluid mt40"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "90vh",
        padding: "40px 0",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            {/* Tabs Navigation */}
            <div
              style={{ marginBottom: "40px" }}
              className="d-flex flex-wrap gap-5  d-flex justify-content-center"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`btn d-flex align-items-center gap-2 px-4 py-3 border-0 rounded-pill fw-medium ${
                    activeTab === tab.id ? "text-white" : "text-dark bg-white"
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? "#797631" : "white",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    minHeight: "56px",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {/* <span style={{ fontSize: "18px" }}>{tab.icon}</span> */}
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Content Area */}
            <div className="row align-items-center ">
              <div className="col-lg-6 mb-4 mt-4 mb-lg-0">
                <div
                  className="rounded-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #87ceeb 100%)",
                    height: "600px",
                    position: "relative",
                  }}
                ></div>
              </div>

              <div className="col-lg-6">
                <div className="ps-lg-4">
              

                  {/* Title */}
                  <h2
                    className="mb-4 fw-bold"
                    style={{
                      fontSize: "2.5rem",
                      color: "#797631",
                      lineHeight: "1.2",
                    }}
                  >
                    {tabContent[activeTab]?.title}
                  </h2>

               
                  <p className=" mb-5">{tabContent[activeTab]?.paragraph}</p>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

export default WealthManagementTabs;
