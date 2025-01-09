"use client";
import React, {useState} from "react";
import {useAuth} from "@/context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) throw new Error("Failed to log in");

      const data = await response.json();
      login(data.token);
      alert("Login successful");
    } catch (err) {
      console.error("Login error:", err);
      alert((err as Error).message || "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-900 placeholder-gray-400"
            placeholder="Enter email"
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-900 placeholder-gray-400"
            placeholder="Enter password"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
