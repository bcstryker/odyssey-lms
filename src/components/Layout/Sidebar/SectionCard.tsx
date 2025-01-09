import {ISection} from "@/types";

interface SectionCardProps {
  section: ISection;
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
  sidebarOpen: boolean;
  isExpanded: boolean;
  onToggleExpand: (sectionId: string) => void;
}

const SectionCard = ({
  section,
  selectedSection,
  setSelectedSection,
  sidebarOpen,
  isExpanded,
  onToggleExpand,
}: SectionCardProps) => {
  const isSelected = selectedSection === section._id;

  return (
    <div className={`w-full rounded bg-gray-100 ${isExpanded ? "shadow-md" : ""} transition-all duration-200`}>
      {/* Main Card */}
      <button
        onClick={() => {
          setSelectedSection(section._id); // Use _id for consistency
          onToggleExpand(section._id);
        }}
        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${
          isSelected ? "bg-gray-200 font-semibold" : "bg-gray-100"
        } flex items-center justify-start whitespace-normal text-ellipsis text-gray-800`}
      >
        {sidebarOpen ? (
          <span className={`overflow-hidden ${!isSelected && "line-clamp-2"}`}>{section.title}</span>
        ) : (
          <span>{section.title.charAt(0)}</span>
        )}
      </button>

      {/* Expanded Options */}
      <div className={`overflow-hidden transition-all duration-300`}>
        {isExpanded && (
          <div className="bg-gray-200 rounded p-2 space-y-2">
            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-gray-800">
              Lesson Summary
            </button>
            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-gray-800">Quiz</button>
            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-gray-800">Flashcards</button>
            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-gray-800">Experiment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;
