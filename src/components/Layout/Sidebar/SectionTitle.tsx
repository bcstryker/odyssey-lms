import React from "react";

interface SectionTitleProps {
  title: string;
  isSelected: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({title, isSelected}) => {
  return <span className={`overflow-hidden ${!isSelected && "line-clamp-2"}`}>{title}</span>;
};

export default SectionTitle;
