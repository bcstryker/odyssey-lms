import React from "react";

interface SectionButtonProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const SectionButton: React.FC<SectionButtonProps> = ({text, isSelected, onClick}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-1 rounded ${
        isSelected ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-300 text-gray-800"
      }`}
    >
      {text}
    </button>
  );
};

export default SectionButton;
