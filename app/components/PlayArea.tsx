"use client";
import React from "react";
import { Card } from "./Card";
import { useGameContext } from "../context/GameContext";

export const PlayArea: React.FC = ({}) => {
  const { cardData } = useGameContext();

  return (
    <div className="grid grid-cols-6 gap-3">
      {cardData.map((card, index) => {
        return <Card key={index} card={card} />;
      })}
    </div>
  );
};
