import GameBoard from "./Components/GameBoard";
import "./App.css";
import ScoreBoard from "./Components/ScoreBoard";
import { TouchProvider } from "./providers/TouchProvider";

function App() {
  return (
    <>
      <ScoreBoard />
      <TouchProvider>
        <GameBoard classname="app-board" />
      </TouchProvider>
    </>
  );
}

export default App;
