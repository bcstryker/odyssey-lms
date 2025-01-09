"use client";
import {useAuth} from "@/context/AuthContext";

export default function Header() {
  const {token, logout} = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center h-16">
      <p className="text-2xl">Odyssey LMS</p>
      <div className="flex items-baseline">
        {token && (
          <button
            onClick={logout}
            className="ml-4 text-red-400 hover:text-red-500 focus:outline-none focus:ring focus:ring-red-400 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
