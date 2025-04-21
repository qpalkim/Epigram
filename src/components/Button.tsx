import React from "react";

interface ButtonProps {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "white",
      }}
    >
      {label}
    </button>
  );
};
