"use client";

import {useAuth} from "@/context/AuthContext";
import {redirect} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const {token} = useAuth();

  useEffect(() => {
    if (!token) {
      redirect("/login"); // Redirect to login if not authenticated
    } else {
      redirect("/dashboard"); // Redirect to dashboard if authenticated
    }
  }, [token]);

  return null; // Render nothing as the redirection is handled
}
