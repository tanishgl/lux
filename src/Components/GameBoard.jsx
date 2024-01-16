import useMatrixProvider from "../providers/MatrixProvider";
import styles from "./GameBoard.module.css";
import Tile from "./Tile";
import "../index.css";
import useTouchProvider from "../providers/TouchProvider";

function GameBoard() {
  const { status, startNewGame } = useMatrixProvider();
  const { handleTouchStart, handleTouchEnd } = useTouchProvider();
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${styles["game-board"]} ${
        status === "over" ? styles.over : ""
      }`}
    >
      {Array.from({ length: 16 }, (el, idx) => (
        <Tile key={idx} index={idx} />
      ))}
      {status === "over" && (
        <div className={`flex-c ${styles["game-over"]}`}>
          Game Over!{" "}
          <button
            className={`${styles["btn-new-game"]}`}
            onClick={startNewGame}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
