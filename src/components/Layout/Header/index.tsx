"use client";
import {useAuth} from "@/context/AuthContext";
import Branding from "./Branding";
import ButtonContainer from "./ButtonContainer";

export default function Header() {
  const {token, logout} = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center h-16">
      <Branding />
      <ButtonContainer token={token} logout={logout} />
    </header>
  );
}
