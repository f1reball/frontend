"use client";
import React from "react";
import { Card } from "./Card";
import { useGameContext } from "../context/GameContext";
import { Timer } from "./Timer";
import { useTimerContext } from "../context/TimerContext";

export const PlayArea: React.FC = ({}) => {
  const { cardData, isGameComplete, resetGame } = useGameContext();
  const { getFormattedTime } = useTimerContext();

  return (
    <>
      {!isGameComplete ? (
        <>
          <Timer />
          <div className="grid grid-cols-6 gap-3">
            {cardData.map((card, index) => {
              return <Card key={index} card={card} />;
            })}
          </div>
        </>
      ) : (
        <div className="text-lg flex flex-col justify-center items-center gap-8">
          <h1 className="text-23xl">Congratulations</h1>
          <h2 className="font-light">
            You finished the game in {getFormattedTime()}
          </h2>
          <button
            onClick={resetGame}
            className="py-2 px-4 bg-blue-500 rounded-xl"
          >
            Play again
          </button>
        </div>
      )}
    </>
  );
};
