import { House, Plus, Users } from "@phosphor-icons/react";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { ROUTES } from "../pages/routes";

export const Navbar = memo(function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="w-full h-[67px] border-t-[0.5px] border-grey border-opacity-25 bg-white fixed bottom-0">
      <div className="flex justify-evenly items-center h-full">
        <Icon
          onClick={() => navigate(ROUTES.home)}
          $isActive={isActive(ROUTES.home)}
        >
          <House size={32} />
        </Icon>

        <Icon
          className="bg-dark rounded-xl -mt-14"
          onClick={() => navigate(ROUTES.createTrainng)}
        >
          <Plus size={34} color="white" />
        </Icon>

        <Icon
          onClick={() => navigate(ROUTES.friends)}
          $isActive={isActive(ROUTES.friends)}
        >
          <Users size={32} />
        </Icon>
      </div>
    </div>
  );
});

const Icon = styled.div<{
  $isActive?: boolean;
}>`
  padding: 6px;
  color: ${(props) => (props.$isActive ? "#02CF8A" : "#212121")};
`;
