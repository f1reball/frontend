import { PlayArea } from "./components/PlayArea";
import { GameContextProvider } from "./context/GameContext";
import { TimerContextProvider } from "./context/TimerContext";

export default function Home() {
  return (
    <TimerContextProvider>
      <GameContextProvider>
        <main className="flex min-h-screen flex-col items-center justify-center ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <PlayArea />
          </div>
        </main>
      </GameContextProvider>
    </TimerContextProvider>
  );
}
