import React from "react";
import "./Button.css";

const Button = ({ title }) => {
  return (
    <button className="main-btn">
      <span>{title}</span>
    </button>
  );
};

export default Button;
