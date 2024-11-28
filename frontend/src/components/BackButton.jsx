import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/", className = "", color = "blue" }) => {
  const colorVariants = {
    blue: {
      bg: "bg-blue-800",
      hover: "hover:bg-blue-700",
      ring: "focus:ring-blue-500",
      gradient: "from-blue-800 to-blue-700",
    },
    dark: {
      bg: "bg-gray-900",
      hover: "hover:bg-gray-800",
      ring: "focus:ring-gray-600",
      gradient: "from-gray-900 to-gray-800",
    },
  };

  const variant = colorVariants[color] || colorVariants.blue;

  return (
    <div className="flex items-center">
      <Link
        to={destination}
        className={`group relative flex items-center justify-center 
          ${variant.bg} ${variant.hover} 
          text-white font-medium 
          px-5 py-3 rounded-lg 
          w-fit 
          transition-all duration-300 ease-in-out 
          shadow-lg hover:shadow-xl 
          focus:outline-none focus:ring-2 
          ${variant.ring} focus:ring-opacity-50 
          transform hover:-translate-y-1 
          active:scale-95 
          ${className}
        `}
      >
        <span
          className={`absolute inset-0 
            bg-gradient-to-r ${variant.gradient} 
            opacity-0 group-hover:opacity-20 
            transition-opacity duration-300
            rounded-lg
          `}
        />

        <BsArrowLeft
          className="text-2xl transform transition-transform duration-300 
            group-hover:-translate-x-2"
        />
      </Link>
    </div>
  );
};

export default BackButton;
