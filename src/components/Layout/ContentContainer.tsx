import React from "react";

interface ContentContainerProps {
  children?: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  return (
    <div className="flex-grow p-4 bg-slate-400">
      {children}
      <h2 className="text-xl font-bold mb-4">Main</h2>
    </div>
  );
};

export default ContentContainer;
