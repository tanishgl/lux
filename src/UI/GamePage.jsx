import styles from "./GamePage.module.css";
import GameBoard from "../Components/GameBoard";
import Instruction from "../Components/Instruction";
import useMatrixProvider from "../providers/MatrixProvider";
import { TouchProvider } from "../providers/TouchProvider";
import { useEffect } from "react";
import useDbProvider from "../providers/DbProvider";
import Leaderboard from "../Components/Leaderboard";

function GamePage() {
  const { startNewGame } = useMatrixProvider();
  const { getTopPlayers } = useDbProvider();

  useEffect(() => {
    getTopPlayers();
  }, []);
  return (
    <div className="grid grid-cols-2  self-start gap-4">
      <button
        className={`${styles["new-game"]} col-span-2 justify-self-center`}
        onClick={startNewGame}
      >
        New Game
      </button>
      <TouchProvider>
        <GameBoard classname="app-board justify-self-center" />
      </TouchProvider>
      <Leaderboard></Leaderboard>
      <div className="justify-self-center ">
        <Instruction />
      </div>
    </div>
  );
}

export default GamePage;
