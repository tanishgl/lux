import styles from "./Instruction.module.css";

function Instruction() {
  return (
    <div className={`${styles.instruction} flex`}>
      Press the arrow keys to swipe the tiles{" "}
      <span className={`${styles.up}`}>up</span>,{" "}
      <span className={`${styles.right}`}>right</span>,{" "}
      <span className={`${styles.down}`}>down</span> or{" "}
      <span className={`${styles.left}`}>left</span>. Adjacent tiles with same
      <P2 /> will smash and form a bigger <P2 />. See how far you can weild the{" "}
      <P2 />.
    </div>
  );
}

function P2() {
  return <span className={`${styles["power-of-2"]}`}> power of 2</span>;
}

export default Instruction;
