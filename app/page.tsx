import { Timer } from "./components/Timer";
import { PlayArea } from "./components/PlayArea";
import { GameContextProvider } from "./context/GameContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <GameContextProvider>
          <Timer />
          <PlayArea />
        </GameContextProvider>
      </div>
    </main>
  );
}
