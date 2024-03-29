"use client";
import React from "react";
import { useGameContext } from "../context/GameContext";

type Props = {
  id: number;
};

export const Card: React.FC<Props> = ({ id }) => {
  const { addSelection } = useGameContext();
  function handleClick() {
    addSelection({ matchId: id });
  }

  return <div className="h-24 w-24 bg-red-500" onClick={handleClick} />;
};
