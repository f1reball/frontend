"use client";
import React from "react";
import { useGameContext } from "../context/GameContext";
import type { CardType } from "../context/types";

type Props = {
  card: CardType;
};

export const Card: React.FC<Props> = ({ card }) => {
  const { selected, handleCardClick } = useGameContext();

  function handleCardClickLogic() {
    if (card.status !== "matched") {
      card.status = "showing";
      if (card !== selected[0]) {
        handleCardClick(card);
      }
    }
  }

  return (
    <div
      className={`h-24 w-24 flex items-center justify-center ${
        card.status === "matched" ? "bg-blue-500" : "bg-red-500"
      }`}
      onClick={handleCardClickLogic}
    >
      {(card.status === "matched" || card.status === "showing") && (
        <h1>{card.imageId}</h1>
      )}
    </div>
  );
};
