import React from "react";
import { Card } from "./Card";

export const PlayArea: React.FC = ({}) => {
  const array = Array(36).fill(0);
  return (
    <div className="grid grid-cols-6 gap-3">
      {array.map((card, index) => {
        return <Card key={index} id={index} />;
      })}
    </div>
  );
};
