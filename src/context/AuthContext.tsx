"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();
  // const pathname = usePathname();

  const validateToken = (savedToken: string) => {
    try {
      const decoded: {exp: number; role: string} = jwtDecode(savedToken);

      if (decoded.exp * 1000 < Date.now()) {
        // Token expired
        throw new Error("Token expired");
      }
      setToken(savedToken);
      setRole(decoded.role);
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
      return false;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken && validateToken(savedToken)) {
      setIsInitialized(true);
    } else {
      logout();
      setIsInitialized(true);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    validateToken(newToken);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    router.push("/login");
  };

  if (!isInitialized) return <div>Loading...</div>; // Prevent premature render

  return <AuthContext.Provider value={{token, role, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
