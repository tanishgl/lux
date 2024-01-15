import useMatrixProvider from "../providers/MatrixProvider";
import styles from "./ScoreBoard.module.css";

function ScoreBoard() {
  const { totalScore, bestScore, startNewGame, totalMoves, bestScoreMoves } =
    useMatrixProvider();

  return (
    <header className={`${styles.flex} ${styles.scoreboard}`}>
      <ScoreCard total={totalScore} label={"score"} />
      <ScoreCard total={totalMoves} label={"moves"} />
      <ScoreCard total={bestScore} label={"best"} />
      <ScoreCard total={bestScoreMoves} label={"best moves"} />
      <button className={styles["new-game"]} onClick={startNewGame}>
        New Game{" "}
      </button>
    </header>
  );
}

function ScoreCard({ total, label }) {
  return (
    <div className={`${styles.flex} ${styles["flex-c"]} ${styles["gap-8"]}`}>
      <div className={`${styles.flex} ${styles.scorecard}`}>
        {Array.from(total.toString()).map((val, idx) => (
          <p
            key={idx}
            className={`${styles.card} ${styles.flex} ${
              styles[label.split(" ").join("-")]
            }`}
          >
            {val}
          </p>
        ))}
      </div>
      <p className={`${styles["card-label"]}`}>{label}</p>
    </div>
  );
}

export default ScoreBoard;
