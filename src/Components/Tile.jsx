import useMatrixProvider from "../providers/MatrixProvider";
import styles from "./Tile.module.css";

function Tile({ index }) {
  const { board, newTile } = useMatrixProvider();
  const val = board[index];
  const bgClassName = `tile-${val}`;
  return (
    <div
      className={`${styles.tile} ${styles[bgClassName]} ${
        index === newTile ? styles["new-tile"] : ""
      }`}
    >
      {val !== 0 && val}
    </div>
  );
}

export default Tile;
