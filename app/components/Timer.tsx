"use client";
import React from "react";
import { useTimerContext } from "../context/TimerContext";

export const Timer: React.FC = ({}) => {
  const { getFormattedTime } = useTimerContext();

  return <div>{getFormattedTime()}</div>;
};
