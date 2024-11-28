import React from "react";

const Spinner = ({ color = "blue", size = "md", className = "" }) => {
  const colorVariants = {
    blue: {
      bg: "bg-blue-800",
      gradient: "from-blue-700 to-blue-900",
      border: "border-blue-600",
    },
    dark: {
      bg: "bg-gray-900",
      gradient: "from-gray-800 to-gray-900",
      border: "border-gray-700",
    },
    teal: {
      bg: "bg-teal-800",
      gradient: "from-teal-700 to-teal-900",
      border: "border-teal-600",
    },
  };

  const sizeVariants = {
    sm: "w-8 h-8 m-2",
    md: "w-14 h-14 m-4",
    lg: "w-20 h-20 m-6",
  };

  const variant = colorVariants[color] || colorVariants.blue;
  const spinnerSize = sizeVariants[size] || sizeVariants.md;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative ${spinnerSize} rounded-full overflow-hidden shadow-xl border-4 ${variant.border} ${className}`}
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${variant.gradient} animate-spin`}
        />

        <div
          className={`
            absolute inset-2 rounded-full 
            ${variant.bg} 
            bg-opacity-90 
            animate-pulse
          `}
        />

        <div
          className={`
            absolute inset-4 
            rounded-full 
            bg-white
            shadow-inner
          `}
        />
      </div>
    </div>
  );
};

export default Spinner;
