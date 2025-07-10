import React from "react";
import "/public/css/AnimatedText.css";
const AnimatedText = ({ children, color, className = "" }) => {
  return (
    <>
      <h2
        className={`hero-title  animate-up-1 hover-underline ${className} `}
        id={color && "animated_text_hover-underline"}
        style={{
          textShadow: !color ? "0px 0px 7px rgba(0, 0, 0, 0.5)" : "",
          color: color || "#ffffff",
        }}
      >
        {children}
      </h2>
    </>
  );
};

export default AnimatedText;
