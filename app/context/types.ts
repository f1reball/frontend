type Card = {
  matchId: number;
};

type Selected = [] | [Card] | [Card, Card];

type GameContextType = {
  cardData: Card[];
  selected: Selected;
  addSelection: (arg1: Card) => void;
};

export type { Card, GameContextType, Selected };
