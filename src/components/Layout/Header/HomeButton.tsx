import React from "react";
import {useRouter} from "next/navigation";

const HomeButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("dashboard");
      }}
      className="text-blue-400 hover:text-blue-300"
    >
      Home
    </button>
  );
};

export default HomeButton;
