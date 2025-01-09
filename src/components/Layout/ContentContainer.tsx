import React from "react";

interface ContentContainerProps {
  children?: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  return <div className="flex-grow p-4 bg-slate-400 overflow-y-auto">{children}</div>;
};

export default ContentContainer;
