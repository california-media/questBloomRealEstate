const Bathroom = ({ setBathroomCount, bathroomCount }) => {
  const bathOptions = [
    { id: "sbathxany", label: "any", value: 0 },
    { id: "sbathxoneplus", label: "1+", value: 1 },
    { id: "sbathxtwoplus", label: "2+", value: 2 },
    { id: "sbathxthreeplus", label: "3+", value: 3 },
    { id: "sbathxfourplus", label: "4+", value: 4 },
    { id: "sbathxfiveplus", label: "5+", value: 5 },
  ];

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            type="radio"
            onChange={(e) => setBathroomCount(option.value)}
            checked={bathroomCount == option.value}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
