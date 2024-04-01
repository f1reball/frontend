import "@testing-library/jest-dom";
import { fireEvent, getByText, render, waitFor } from "@testing-library/react";
import { TimerContext, useTimerContext } from "../app/context/TimerContext";
import { TimerContextType } from "../app/context/types";

describe("Timer Context", () => {
  const TestComponent = () => {
    const { getFormattedTime, addTime, stopTimer, resetTimer } =
      useTimerContext();
    return (
      <>
        <div data-testid="test-time">{getFormattedTime()}</div>
        <button data-testid="test-addTime" onClick={() => addTime(5)}>
          Add Time
        </button>
        <button onClick={() => stopTimer()} />
        <button onClick={() => resetTimer()} />
      </>
    );
  };

  const defaultContextValue: TimerContextType = {
    addTime: jest.fn(),
    stopTimer: jest.fn(),
    resetTimer: jest.fn(),
    getFormattedTime: () => "00:00",
  };

  it("Renders children and intitilises timer", async () => {
    const { getByTestId } = await render(
      <TimerContext.Provider value={defaultContextValue}>
        <TestComponent />
      </TimerContext.Provider>
    );

    const testTimer = getByTestId("test-time");

    expect(testTimer).toBeInTheDocument();
    expect(testTimer).toHaveTextContent("00:00");
  });

  it("Increments time when addTime is called", async () => {
    const { getByTestId, rerender } = render(
      <TimerContext.Provider value={defaultContextValue}>
        <TestComponent />
      </TimerContext.Provider>
    );

    const testTimer = getByTestId("test-time");
    const addTimeButton = getByTestId("test-addTime");

    expect(testTimer).toBeInTheDocument();
    expect(testTimer).toHaveTextContent("00:00");

    await fireEvent.click(addTimeButton);
    expect(defaultContextValue.addTime).toHaveBeenCalledWith(5);

    await rerender(<TestComponent />);

    setTimeout(() => {
      expect(getByTestId("test-time")).toHaveTextContent("00:05");
    }, 100);
  });
});
