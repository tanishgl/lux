import useMatrixProvider from "../providers/MatrixProvider";
import styles from "./ScoreBoard.module.css";

function ScoreBoard() {
  const { totalScore, bestScore, startNewGame } = useMatrixProvider();

  return (
    <header className={`${styles.flex} ${styles.scoreboard}`}>
      <ScoreCard total={totalScore} label={"Total"} />
      <ScoreCard total={bestScore} label={"Best"} />
      <button className={styles["new-game"]} onClick={startNewGame}>
        New Game{" "}
      </button>
    </header>
  );
}

function ScoreCard({ total, label }) {
  return (
    <div className={`${styles.flex} ${styles["flex-c"]}`}>
      <div className={`${styles.flex} ${styles.scorecard}`}>
        {Array.from(total.toString()).map((val, idx) => (
          <p key={idx} className={`${styles.card} ${styles.flex}`}>
            {val}
          </p>
        ))}
      </div>
      <p>{label}</p>
    </div>
  );
}

export default ScoreBoard;
