import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Card } from "../app/components/Card";
import { GameContext } from "../app/context/GameContext";
import { CardType, GameContextType } from "../app/context/types";

describe("Card Component", () => {
  const cardDefault: CardType = {
    id: "1",
    matchId: "2",
    imageId: 1,
    status: "hidden",
  };

  const cardMatched: CardType = {
    id: "1",
    matchId: "2",
    imageId: 1,
    status: "matched",
  };

  const contextDefault: GameContextType = {
    cardData: [cardDefault],
    selected: [],
    isAwaitingFlipback: false,
    isGameComplete: false,
    handleCardClick: jest.fn(),
    resetGame: jest.fn(),
  };

  const flipbackTest: GameContextType = {
    cardData: [cardDefault],
    selected: [],
    isAwaitingFlipback: true,
    isGameComplete: false,
    handleCardClick: jest.fn(),
    resetGame: jest.fn(),
  };

  const cardMatchedTest: GameContextType = {
    cardData: [cardMatched],
    selected: [],
    isAwaitingFlipback: false,
    isGameComplete: false,
    handleCardClick: jest.fn(),
    resetGame: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByRole } = render(
      <GameContext.Provider value={contextDefault}>
        <Card card={cardDefault} />
      </GameContext.Provider>
    );
    const cardButton = getByRole("button");
    expect(cardButton).toBeInTheDocument();
  });

  it("Handles click correctly", () => {
    const { getByRole } = render(
      <GameContext.Provider value={contextDefault}>
        <Card card={cardDefault} />
      </GameContext.Provider>
    );
    const cardButton = getByRole("button");
    fireEvent.click(cardButton);
    expect(contextDefault.handleCardClick).toHaveBeenCalledWith(cardDefault);
  });

  it("Doesn't click when awaiting flipback", () => {
    const { getByRole } = render(
      <GameContext.Provider value={flipbackTest}>
        <Card card={cardDefault} />
      </GameContext.Provider>
    );

    const cardButton = getByRole("button");
    fireEvent.click(cardButton);

    expect(flipbackTest.handleCardClick).not.toHaveBeenCalled();
  });

  it("Doesn't click when status is matched", () => {
    const { getByRole } = render(
      <GameContext.Provider value={cardMatchedTest}>
        <Card card={cardMatched} />
      </GameContext.Provider>
    );
    const cardButton = getByRole("button");
    fireEvent.click(cardButton);
    expect(cardMatchedTest.handleCardClick).not.toHaveBeenCalled();
  });
});
