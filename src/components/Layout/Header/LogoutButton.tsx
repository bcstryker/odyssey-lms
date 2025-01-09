import React from "react";

interface LogoutButtonProps {
  logout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({logout}) => {
  return (
    <button onClick={logout} className="ml-4 text-red-400 hover:text-red-300">
      Logout
    </button>
  );
};

export default LogoutButton;
