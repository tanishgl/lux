import GameBoard from "./Components/GameBoard";
import "./App.css";
import Header from "./Components/Header";
import { TouchProvider } from "./providers/TouchProvider";
import useMatrixProvider from "./providers/MatrixProvider";
import Instruction from "./Components/Instruction";

function App() {
  const { startNewGame } = useMatrixProvider();
  return (
    <div className="grid-app">
      <Header />
      <button className={"new-game"} onClick={startNewGame}>
        New Game
      </button>
      <TouchProvider>
        <GameBoard classname="app-board" />
      </TouchProvider>
      <Instruction />
    </div>
  );
}

export default App;
