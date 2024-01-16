import GameBoard from "./Components/GameBoard";
import "./App.css";
import ScoreBoard from "./Components/ScoreBoard";
import { TouchProvider } from "./providers/TouchProvider";
import useMatrixProvider from "./providers/MatrixProvider";

function App() {
  const { startNewGame } = useMatrixProvider();
  return (
    <div className="grid-app">
      <ScoreBoard />
      <button className={"new-game"} onClick={startNewGame}>
        New Game
      </button>
      <TouchProvider>
        <GameBoard classname="app-board" />
      </TouchProvider>
    </div>
  );
}

export default App;
