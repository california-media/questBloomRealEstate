const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Personalized Property Guidance",
      description:
        "Tailored support to help you find a home that fits your lifestyle and aspirations",
    },
    {
      icon: "flaticon-keywording",
      title: "Unmatched Market Expertise",
      description:
        "In-depth knowledge of Dubai's real estate ensures smarter decisions and better opportunities",
    },
    {
      icon: "flaticon-investment",
      title: "Trust, Integrity & Excellence",
      description:
        "A service built on honesty, quality, and long-term relationships.",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
