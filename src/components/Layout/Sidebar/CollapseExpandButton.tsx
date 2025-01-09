import React from "react";

interface CollapseExpandButtonProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({sidebarOpen, toggleSidebar}) => {
  return (
    <button
      onClick={toggleSidebar}
      className={`bg-gray-300 text-gray-600 hover:bg-gray-400 focus:outline-none rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform ${
        sidebarOpen ? "" : "rotate-180"
      }`}
      aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
    >
      {sidebarOpen ? "<" : ">"}
    </button>
  );
};

export default CollapseExpandButton;
