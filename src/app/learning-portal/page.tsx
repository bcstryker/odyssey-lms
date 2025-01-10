"use client";

import ContentContainer from "@/components/Layout/ContentContainer";
import Sidebar from "@/components/Layout/Sidebar";
import SectionContent from "./Components/SectionContent";
import {useAuth} from "@/context/AuthContext";
import {IFlashCard, IQuestion, ISection, ITopic} from "@/types";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Quiz from "./Components/Quiz";
import FlashCards from "./Components/FlashCards";

export default function LearningPortal() {
  const {token} = useAuth();
  const searchParams = useSearchParams();
  const courseCode = searchParams.get("courseCode");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sections, setSections] = useState<ISection[]>([]);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<IFlashCard[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("Lesson");

  // Fetch sections when courseCode changes
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

  // Fetch topics when a section is selected
  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedSection) return;

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
        setTopics(data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    fetchTopics();
  }, [selectedSection]);

  // Fetch quiz questions when Quiz is selected
  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedSubmenu !== "Quiz") return;

      try {
        const response = await fetch(`/api/questions?sectionId=${selectedSection}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [selectedSection, selectedSubmenu]);

  // Fetch flashcards when Flashcards is selected
  useEffect(() => {
    const fetchFlashcards = async () => {
      if (selectedSubmenu !== "Flashcards") return;

      try {
        const response = await fetch(`/api/flashcards?sectionId=${selectedSection}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flashcards");
        }

        const data = await response.json();
        setFlashcards(data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    };

    fetchFlashcards();
  }, [selectedSection, selectedSubmenu]);

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

  const renderContent = () => {
    if (selectedSubmenu === "Lesson") {
      return <SectionContent topics={topics} />;
    } else if (selectedSubmenu === "Quiz") {
      return <Quiz questions={questions} />;
    } else if (selectedSubmenu === "Flashcards") {
      return <FlashCards flashcards={flashcards} />;
    }
    return <div className="p-4 bg-white rounded shadow">Feature coming soon for: {selectedSubmenu}</div>;
  };

  return (
    <div className="flex flex-row flex-grow">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sections={sections}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedSubmenu={selectedSubmenu}
        setSelectedSubmenu={setSelectedSubmenu}
      />
      <ContentContainer>{renderContent()}</ContentContainer>
    </div>
  );
}
