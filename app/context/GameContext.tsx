"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Card, GameContextType, Selected } from "./types";

export const GameContext = createContext<GameContextType>({
  cardData: [],
  selected: [],
  addSelection: () => undefined,
});

type Props = {
  children: React.ReactNode;
};

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const [cardData, setCardData] = useState<Card[]>(() => generateCardArray());
  const [selected, setSelected] = useState<Selected>(() => []);

  function generateCardArray() {
    const arr = [];
    for (let i = 0; i <= 17; i++) {
      arr.push({ matchId: i });
      arr.push({ matchId: i });
    }
    return arr.sort(() => 0.5 - Math.random());
  }

  function addSelection(card: Card) {
    setSelected((prev) => {
      if (prev.length === 2) {
        return [card];
      } else {
        return [...prev, card];
      }
    });
  }

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const value = useMemo(() => {
    return {
      cardData,
      selected,
      addSelection,
    };
  }, [cardData, selected]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
