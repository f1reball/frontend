"use client";
import React from "react";
import { useGameContext } from "../context/GameContext";
import type { CardType } from "../context/types";
import Image from "next/image";

type Props = {
  card: CardType;
};

export const Card: React.FC<Props> = ({ card }) => {
  const { selected, handleCardClick, isAwaitingFlipback } = useGameContext();

  function handleCardClickLogic() {
    if (!isAwaitingFlipback) {
      if (card.status !== "matched") {
        card.status = "showing";
        if (card !== selected[0]) {
          handleCardClick(card);
        }
      }
    }
  }

  return (
    <button
      className={`h-[96px] w-[66px] flex items-center justify-center ${
        card.status === "matched" ? "bg-transparent" : "bg-red-500"
      }`}
      onClick={handleCardClickLogic}
    >
      {(card.status === "matched" || card.status === "showing") && (
        <Image
          src={`${card.imageId}.svg`}
          alt={`${card.imageId}`}
          width={66}
          height={96}
        />
      )}
    </button>
  );
};
