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
    // who: {
    //   title: "Who We Are",
    //   paragraph:
    //     "Step into a world of luxury living redefined by Questbloom Real Estate in the vibrant city of Dubai. Our passion for exquisite properties and dedication to unparalleled service sets us apart in the realm of real estate. From the glitz of Dubai Marina’s waterfront to the prestige of Downtown Dubai’s skyline, our portfolio showcases the epitome of sophistication. At Questbloom Real Estate, we’re more than just agents – we’re your partners in finding the perfect home tailored to your lifestyle. With a keen eye for detail and a commitment to excellence, we navigate the Dubai real estate landscape to bring you exclusive opportunities that resonate with your aspirations. Discover a new standard of luxury living with Questbloom Real Estate, where every home tells a story of opulence and elegance. Let us guide you on your journey to finding the home of your dreams in the dynamic city of Dubai.",
    //   //   testimonial:
    //   //     "\"It's a comprehensive tool that we rely on daily to guide our investment decisions and ensure we're on track\"",
    // },
    mission: {
      title: "Our Mission",
      paragraph:
        "At Questbloom Real Estate, our mission is to guide you on your journey to finding the perfect home in Dubai. We prioritize unparalleled service, expertise, and personalized attention for every client. Our goal is to redefine the real estate experience by putting your needs first and foremost. With a commitment to excellence, we strive to be your trusted partner in navigating the dynamic Dubai real estate market. Whether you're in search of a luxurious waterfront villa, a chic urban apartment, or a serene beachfront retreat, we're here to make your dreams come true. Experience the difference with Questbloom Real Estate – where our mission is to guide you every step of the way towards your dream home in Dubai.",
      //   testimonial:
      //     '"The strategic insights have transformed how we approach business decisions"',
    },
    vision: {
      title: "Our Vision",
      paragraph:
        "At Questbloom Real Estate, our vision is to redefine the standard of excellence in Dubai's real estate market. We aim to be the premier choice for clients seeking unparalleled service, expertise, and personalized attention. Our vision encompasses creating lasting relationships built on trust, transparency, and integrity. We strive to exceed expectations by consistently delivering exceptional results and guiding clients towards their dream homes. With a forward-thinking approach and a commitment to innovation, we envision a future where every client's real estate journey is seamless, rewarding, and unforgettable. Experience our vision come to life at Questbloom Real Estate – where your dreams become reality.",
      //   testimonial:
      //     '"Their stock planning expertise has significantly improved our portfolio performance"',
    },
    strength: {
      title: "Our Strengths",
      paragraph:
        "At Questbloom Real Estate, our strengths lie in our unwavering commitment to excellence, unparalleled market expertise, and personalized service. With a deep understanding of Dubai’s real estate landscape, we offer invaluable insights and guidance to our clients. Our dedication to exceeding expectations ensures seamless transactions and exceptional results. Trust, integrity, and transparency are the cornerstones of our approach, fostering lasting relationships with our clients. From luxury waterfront properties to urban apartments, our diverse portfolio showcases our ability to cater to every need. Experience the strength of Questbloom Real Estate – where your real estate goals become reality.",
      //   testimonial:
      //     '"The investment planning service exceeded our expectations in every way"',
    },
    // choose: {
    //   title: "Why Choose Us",
    //   paragraph:
    //     "Choosing a real estate partner in Dubai is a big decision, and here’s why Questbloom Real Estate should be your top choice. We don’t just sell properties; we offer unmatched expertise, personalized service, and genuine care for your needs. Our team knows Dubai’s real estate inside out, so you can trust us to provide valuable insights and guidance every step of the way. But it’s not just about expertise – it’s about integrity. We believe in transparency and honesty, building relationships based on trust and respect. Plus, our diverse portfolio ensures there’s something for everyone, whether you’re looking for a luxury waterfront villa or a cozy urban apartment. At Questbloom Real Estate, your satisfaction is our priority. We go above and beyond to exceed your expectations and make your real estate journey in Dubai as smooth and enjoyable as possible. Choose Questbloom Real Estate and let us help you find your dream home in the dazzling city of Dubai.",
    //   //   testimonial:
    //   //     '"The investment planning service exceeded our expectations in every way"',
    // },
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
                  {/* Optimization Badge */}
                  {/* <div className="mb-3">
                    <span
                      className="badge px-3 py-2 rounded-pill"
                      style={{
                        backgroundColor: "#e9ecef",
                        color: "#6c757d",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Optimization
                    </span>
                  </div> */}

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

                  {/* Bullet Points */}
                  {/* <ul className="list-unstyled mb-5">
                    {tabContent[activeTab].points.map((point, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-start mb-3"
                        style={{
                          opacity: 0,
                          animation: `fadeInUp 0.6s ease-out ${
                            index * 0.1
                          }s forwards`,
                        }}
                      >
                        <span
                          className="me-3 mt-1 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#2d3436",
                            flexShrink: 0,
                          }}
                        ></span>
                        <span
                          style={{
                            color: "#636e72",
                            fontSize: "16px",
                            lineHeight: "1.6",
                          }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul> */}
                  <p className=" mb-5">{tabContent[activeTab]?.paragraph}</p>

                  {/* Testimonial */}
                  {/* <div
                    className="d-flex align-items-start gap-3 mb-4"
                    style={{
                      opacity: 0,
                      animation: "fadeInUp 0.6s ease-out 0.4s forwards",
                    }}
                  >
                    <div
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      👨‍💼
                    </div>
                    <div>
                      <p
                        className="mb-2 fst-italic"
                        style={{
                          color: "#636e72",
                          fontSize: "16px",
                          lineHeight: "1.5",
                        }}
                      >
                        {tabContent[activeTab].testimonial}
                      </p>
                      <p
                        className="mb-0 fw-semibold"
                        style={{
                          color: "#2d3436",
                          fontSize: "14px",
                        }}
                      >
                        {tabContent[activeTab].author}
                      </p>
                    </div>
                  </div> */}

                  {/* Get Started Button */}
                  {/* <button
                    className="btn btn-dark px-4 py-3  rounded-pill fw-medium"
                    style={{
                      fontSize: "16px",
                      minWidth: "140px",
                      opacity: 0,
                      animation: "fadeInUp 0.6s ease-out 0.5s forwards",
                      marginTop: "50px",
                    }}
                  >
                    Get Started
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
