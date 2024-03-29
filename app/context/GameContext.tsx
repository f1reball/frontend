"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CardType, GameContextType, Selected } from "./types";
import { v4 } from "uuid";

export const GameContext = createContext<GameContextType>({
  cardData: [],
  selected: [],
  isAwaitingFlipback: false,
  isGameComplete: false,
  handleCardClick: () => undefined,
  resetGame: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const [cardData, setCardData] = useState<CardType[]>(() =>
    generateCardArray()
  );
  const [selected, setSelected] = useState<Selected>(() => []);
  const [isAwaitingFlipback, setIsAwaitingFlipback] = useState<boolean>(false);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);

  function generateCardArray(): CardType[] {
    const arr: CardType[] = [];
    for (let i = 0; i <= 3; i++) {
      const id1 = v4();
      const id2 = v4();
      arr.push({ id: id1, matchId: id2, imageId: i, status: "hidden" });
      arr.push({ id: id2, matchId: id1, imageId: i, status: "hidden" });
    }

    return arr.sort(() => 0.5 - Math.random());
  }

  async function handleCardClick(card: CardType) {
    setIsAwaitingFlipback(true);
    if (selected.length === 1) {
      if (selected[0].matchId === card.id) {
        setCardData((prevCardData) =>
          prevCardData.map((c) =>
            c.id === card.id || c.matchId === card.id
              ? { ...c, status: "matched" }
              : c
          )
        );
      } else {
        setCardData((prevCardData) =>
          prevCardData.map((c) =>
            c.id === selected[0].id || c.id === card.id
              ? { ...c, status: "showing" }
              : c
          )
        );
        await new Promise((resolve) => setTimeout(resolve, 200));
        setCardData((prevCardData) =>
          prevCardData.map((c) =>
            c.status === "showing" ? { ...c, status: "hidden" } : c
          )
        );
      }
      setSelected([]);
    } else {
      setSelected([card]);
    }
    setIsAwaitingFlipback(false);
  }

  function resetGame() {
    setCardData(() => generateCardArray());
    setSelected(() => []);
    setIsAwaitingFlipback(false);
    setIsGameComplete(false);
  }

  useEffect(() => {
    setIsGameComplete(cardData.every((c) => c.status === "matched"));
  }, [cardData]);

  const value = useMemo(() => {
    return {
      cardData,
      selected,
      isAwaitingFlipback,
      isGameComplete,
      handleCardClick,
      resetGame,
    };
  }, [cardData, selected, isGameComplete]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
