type CardType = {
  id: string;
  matchId: string;
  imageId: number;
  status: "hidden" | "showing" | "matched";
};

type Selected = [] | [CardType];

type GameContextType = {
  cardData: CardType[];
  selected: Selected;
  isAwaitingFlipback: boolean;
  isGameComplete: boolean;
  handleCardClick: (arg1: CardType) => void;
  resetGame: () => void;
};

export type { CardType, GameContextType, Selected };
