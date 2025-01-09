"use client";

import {useAuth} from "@/context/AuthContext";
import StudentPanel from "./Components/StudentPanel";
import ManagementPanel from "./Components/ManagementPanel";

const Dashboard = () => {
  const {token, role} = useAuth();
  const displayRole = role ? role[0].toLocaleUpperCase() + role.slice(1) : "";
  const headerText = role ? `${displayRole} Dashboard` : "Dashboard";

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p>Please log in to access the application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="p-4 bg-blue-500 text-white">
        <h1 className="text-xl font-bold">{headerText}</h1>
      </header>
      <main className="flex-grow p-6 bg-gray-100 text-gray-600">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Account Management</h2>
        </div>
        <StudentPanel />
        {(role === "instructor" || role === "admin") && <ManagementPanel role={role} />}
      </main>
    </div>
  );
};

export default Dashboard;
