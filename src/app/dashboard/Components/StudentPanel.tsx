import {useEffect, useState} from "react";
import {getTokenFromLocalStorage} from "@/utils/token";
import {ICourse} from "@/types";
import {useRouter} from "next/navigation";

export default function StudentPanel() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null); // Track selected course
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getTokenFromLocalStorage();
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: ICourse) => {
    setSelectedCourse(course); // Display course details
  };

  const navigateToLearningPortal = (course: ICourse) => {
    console.log(course);
    router.push(`/learning-portal?courseCode=${course.code}`); // Navigate to the learning portal
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id} className="p-2 bg-white shadow mb-2">
            <button onClick={() => handleCourseClick(course)} className="text-blue-500 hover:underline">
              {course.title}
            </button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h4 className="text-lg font-bold">{selectedCourse.title}</h4>
          <p>{selectedCourse.description}</p>
          <button
            onClick={() => navigateToLearningPortal(selectedCourse)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Learning Portal
          </button>
        </div>
      )}
    </div>
  );
}
