"use client";

import ContentContainer from "@/components/Layout/ContentContainer";
import Sidebar from "@/components/Layout/Sidebar";
import SectionContent from "./Components/SectionContent";
import {useAuth} from "@/context/AuthContext";
import {ISection, ITopic} from "@/types";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export default function LearningPortal() {
  const {token} = useAuth();
  const searchParams = useSearchParams();
  const courseCode = searchParams.get("courseCode");
  const [sections, setSections] = useState<ISection[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      if (!courseCode) return;

      try {
        const response = await fetch(`/api/sections?courseCode=${courseCode}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sections");
        }

        const data = await response.json();
        setSections(data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, [courseCode]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedSection) {
        console.log("No section selected");
        return;
      }
      setLoadingTopics(true);
      try {
        const response = await fetch(`/api/topics?sectionId=${selectedSection}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();
        console.log("Fetched topics:", data);
        setTopics(data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [selectedSection]);

  if (!token) {
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p>Please log in to access the application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-grow">
      <Sidebar
        sidebarOpen={true}
        setSidebarOpen={() => {}}
        sections={sections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <ContentContainer>
        {loadingTopics ? <p>Loading topics...</p> : <SectionContent topics={topics} />}
      </ContentContainer>
    </div>
  );
}
