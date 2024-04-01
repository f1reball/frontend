import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { GameContextType } from "../app/context/types";
import { GameContext, useGameContext } from "@/app/context/GameContext";

describe("Game Context", () => {
  const defaultContextValue: GameContextType = {
    cardData: [],
    selected: [],
    isAwaitingFlipback: false,
    isGameComplete: false,
    handleCardClick: jest.fn(),
    resetGame: jest.fn(),
  };

  it("Renders children without crashing", () => {
    render(
      <GameContext.Provider value={defaultContextValue}>
        <div />
      </GameContext.Provider>
    );
  });
});
