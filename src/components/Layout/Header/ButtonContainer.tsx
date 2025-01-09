import React from "react";
import HomeButton from "./HomeButton";
import LogoutButton from "./LogoutButton";

interface ButtonContainerProps {
  token: string | null;
  logout: () => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({token, logout}) => {
  return (
    <div className="flex items-baseline">
      <HomeButton />
      {token && <LogoutButton logout={logout} />}
    </div>
  );
};

export default ButtonContainer;
