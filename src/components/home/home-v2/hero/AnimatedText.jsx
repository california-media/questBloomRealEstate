import React from "react";
const AnimatedText = ({ children, color, className = "" }) => {
  return (
    <>
      <style>
        {`
          .hover-underline {
            display: inline-block;
            position: relative;
            font-size: 2rem;
            color: #ffffff;
            cursor: default;
            transition: color 0.4s ease-out; /* Added for text color transition */
          }
          
         
          .hover-underline::after,
          .hover-underline::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -5px;
            left: 0;
            transform: scaleX(0);
            transition: transform 0.4s ease-out;
          }
          
          .hover-underline::before {
            top: -5px;
            background: linear-gradient(to right, #797631, #ffffff);
            transform-origin: left;
          }
          
          .hover-underline::after {
            background: linear-gradient(to left, #797631, #ffffff);
            transform-origin: right;
          }
          
          .hover-underline:hover::before {
            transform: scaleX(1);
            transform-origin: right;
          }
          
          .hover-underline:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        `}
      </style>
      <h2
        className={`hero-title mb30 animate-up-1 hover-underline ${className} `}
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
