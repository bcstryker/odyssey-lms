import React, {useState} from "react";
import SectionCard from "./SectionCard";
import CollapseExpandButton from "./CollapseExpandButton";
import {ISection} from "@/types";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sections: ISection[];
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  sidebarOpen,
  setSidebarOpen,
  selectedSection,
  setSelectedSection,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleToggleExpand = (sectionId: string) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } p-2 overflow-y-auto flex-shrink-0`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-xl text-gray-700 my-4 whitespace-nowrap overflow-hidden text-ellipsis">
          {sidebarOpen && "Sections"}
        </p>
        <CollapseExpandButton sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <ul className="space-y-2">
        {sidebarOpen &&
          sections
            .sort((a, b) => a.number - b.number)
            .map((section) => (
              <li key={section._id}>
                <SectionCard
                  section={section}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                  isExpanded={expandedSection === section._id}
                  onToggleExpand={() => handleToggleExpand(section._id)}
                />
              </li>
            ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
