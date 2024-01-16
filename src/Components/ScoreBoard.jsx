import useMatrixProvider from "../providers/MatrixProvider";
import styles from "./ScoreBoard.module.css";

function ScoreBoard() {
  const { totalScore, bestScore, totalMoves, bestScoreMoves } =
    useMatrixProvider();

  return (
    <header className={`${styles.scoreboard}`}>
      <ScoreCard total={totalScore} label={"score"} />
      <ScoreCard total={totalMoves} label={"moves"} />
      <ScoreCard total={bestScore} label={"best"} />
      <ScoreCard total={bestScoreMoves} label={"boves"} />
    </header>
  );
}

function ScoreCard({ total, label }) {
  return (
    <div className={`${styles.flex} ${styles["flex-c"]} ${styles["gap-8"]}`}>
      <div className={`${styles.flex} ${styles.scorecard}`}>
        {Array.from(total.toString()).map((val, idx) => (
          <div
            key={idx}
            className={`${styles.card} ${styles.flex} ${
              styles[label.split(" ").join("-")]
            }`}
          >
            {val}
          </div>
        ))}
      </div>
      <div className={`${styles["card-label"]}`}>{label}</div>
    </div>
  );
}

export default ScoreBoard;
