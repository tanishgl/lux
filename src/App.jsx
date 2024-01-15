import GameBoard from "./Components/GameBoard";
import useMatrixProvider from "./providers/MatrixProvider";
import "./App.css";
import ScoreBoard from "./Components/ScoreBoard";

function App() {
  const { status } = useMatrixProvider();
  return (
    <>
      <ScoreBoard />
      <GameBoard classname="app-board" />
    </>
  );
}

export default App;
