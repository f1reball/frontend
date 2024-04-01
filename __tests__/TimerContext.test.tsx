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
        <button data-testid="test-addTime" onClick={() => addTime(5)} />
        <button data-testid="test-stopTimer" onClick={() => stopTimer()} />
        <button data-testid="test-resetTimer" onClick={() => resetTimer()} />
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

    expect(getByTestId("test-time")).toBeInTheDocument();
    expect(getByTestId("test-time")).toHaveTextContent("00:00");

    await fireEvent.click(getByTestId("test-addTime"));
    expect(defaultContextValue.addTime).toHaveBeenCalledWith(5);

    await rerender(<TestComponent />);

    setTimeout(() => {
      expect(getByTestId("test-time")).toHaveTextContent("00:05");
    }, 100);
  });

  it("Stops the timer when stopTimer is called", async () => {
    const { getByTestId, rerender } = render(
      <TimerContext.Provider value={defaultContextValue}>
        <TestComponent />
      </TimerContext.Provider>
    );

    expect(getByTestId("test-time")).toBeInTheDocument();
    expect(getByTestId("test-time")).toHaveTextContent("00:00");

    await fireEvent.click(getByTestId("test-stopTimer"));
    expect(defaultContextValue.stopTimer).toHaveBeenCalled();

    await rerender(<TestComponent />);

    setTimeout(() => {
      expect(getByTestId("test-time")).toHaveTextContent("00:00");
    }, 100);
  });
});
