import {ISection} from "@/types";
import SectionButton from "./SectionButton";
import SectionTitle from "./SectionTitle";

interface SectionCardProps {
  section: ISection;
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
  selectedSubmenu: string;
  setSelectedSubmenu: (submenu: string) => void;
  isExpanded: boolean;
  onToggleExpand: (sectionId: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  selectedSection,
  setSelectedSection,
  selectedSubmenu,
  setSelectedSubmenu,
  isExpanded,
  onToggleExpand,
}) => {
  const isSelected = selectedSection === section.sectionId;

  return (
    <div className={`w-full rounded bg-gray-100 ${isExpanded ? "shadow-md" : ""} transition-all duration-200`}>
      <button
        onClick={() => {
          setSelectedSection(section.sectionId);
          onToggleExpand(section._id);
        }}
        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${
          isSelected ? "bg-gray-200 font-semibold" : "bg-gray-100"
        } flex items-center justify-start whitespace-normal text-ellipsis text-gray-800`}
      >
        <SectionTitle title={section.title} isSelected={isSelected} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-screen" : "max-h-0"}`}>
        {isExpanded && (
          <div className="bg-gray-200 rounded p-2 space-y-2">
            <SectionButton
              text="Lesson"
              isSelected={selectedSubmenu === "Lesson"}
              onClick={() => setSelectedSubmenu("Lesson")}
            />
            <SectionButton
              text="Flashcards"
              isSelected={selectedSubmenu === "Flashcards"}
              onClick={() => setSelectedSubmenu("Flashcards")}
            />
            <SectionButton
              text="Quiz"
              isSelected={selectedSubmenu === "Quiz"}
              onClick={() => setSelectedSubmenu("Quiz")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;
