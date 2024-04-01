"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { TimerContextType } from "./types";

export const TimerContext = createContext<TimerContextType>({
  addTime: () => undefined,
  stopTimer: () => undefined,
  resetTimer: () => undefined,
  getFormattedTime: () => "00:00",
});

type Props = {
  children: React.ReactNode;
};

export const useTimerContext = () => {
  return useContext(TimerContext);
};

export const TimerContextProvider: React.FC<Props> = ({ children }) => {
  const [time, setTime] = useState<number>(0);
  const [isStopped, setIsStopped] = useState<boolean>(false);

  function addTime(t: number) {
    setTime((prev) => prev + 5);
  }

  function getFormattedTime() {
    const date = new Date(0);
    date.setSeconds(time);

    return `${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  }

  function stopTimer() {
    setIsStopped(true);
  }

  function resetTimer() {
    setTime(0);
    setIsStopped(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStopped]);

  const value = useMemo(() => {
    return {
      addTime,
      stopTimer,
      resetTimer,
      getFormattedTime,
    };
  }, [time]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
