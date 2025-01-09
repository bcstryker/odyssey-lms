import React from "react";

interface SectionButtonProps {
  text: string;
}

const SectionButton: React.FC<SectionButtonProps> = ({text}) => {
  const handleClick = () => {
    // Logic to load the respective component
    console.log(`Loading ${text} component`);
  };

  return (
    <button onClick={handleClick} className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-gray-800">
      {text}
    </button>
  );
};

export default SectionButton;
