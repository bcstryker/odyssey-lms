import React, {useState} from "react";
import SectionTitle from "./SectionTitle";
import SectionButton from "./SectionButton";
import {ISection} from "@/types";

interface SectionCardProps {
  section: ISection;
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
  isExpanded: boolean;
  onToggleExpand: (sectionId: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  selectedSection,
  setSelectedSection,
  isExpanded,
  onToggleExpand,
}) => {
  const isSelected = selectedSection === section._id;
  const [isExpandedState, setIsExpandedState] = useState(isExpanded);

  const toggleExpand = () => {
    setIsExpandedState(!isExpandedState);
    onToggleExpand(section._id);
  };

  return (
    <div className={`w-full rounded bg-gray-100 ${isExpandedState ? "shadow-md" : ""} transition-all duration-200`}>
      <button
        onClick={() => {
          setSelectedSection(section.sectionId);
          toggleExpand();
        }}
        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${
          isSelected ? "bg-gray-200 font-semibold" : "bg-gray-100"
        } flex items-center justify-start whitespace-normal text-ellipsis text-gray-800`}
      >
        <SectionTitle title={section.title} isSelected={isSelected} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpandedState ? "max-h-screen" : "max-h-0"}`}>
        {isExpandedState && (
          <div className="bg-gray-200 rounded p-2 space-y-2">
            <SectionButton text="Lesson Summary" />
            <SectionButton text="Quiz" />
            <SectionButton text="Flashcards" />
            <SectionButton text="Experiment" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;
