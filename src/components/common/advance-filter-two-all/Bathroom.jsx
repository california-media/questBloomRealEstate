const Bathroom = ({ setBathroomCount, bathroomCount }) => {
  const bathOptions = [
    { id: "bathxany", label: "any", value: 0 },
    { id: "bathxoneplus", label: "1+", value: 1 },
    { id: "bathxtwoplus", label: "2+", value: 2 },
    { id: "bathxthreeplus", label: "3+", value: 3 },
    { id: "bathxfourplus", label: "4+", value: 4 },
    { id: "bathxfiveplus", label: "5+", value: 5 },
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
