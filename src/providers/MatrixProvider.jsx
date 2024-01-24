import { createContext, useContext, useEffect, useReducer } from "react";
import { useKey } from "../Hooks/useKey";

const MatrixContext = createContext();

const boardZero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const initialState = {
  status: "start",
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  totalScore: 0,
  bestScore: 0,
  totalMoves: 0,
  bestScoreMoves: 0,
  newTile: 0,
};

function getRandom(left, right) {
  return Math.floor(Math.random() * (right + 1)) + left;
}

function getRandomInArray(arr) {
  return arr[getRandom(0, arr.length - 1)];
}

function reducer(state, action) {
  switch (action.type) {
    case "game/start":
      return {
        ...state,
        status: "run",
        board: action.payload,
        totalScore: 0,
        totalMoves: 0,
      };
    case "game/next":
      return {
        ...state,
        board: action.payload.boardN,
        totalScore: state.totalScore + action.payload.score,
        totalMoves: state.totalMoves + 1,
      };
    case "game/over":
      return {
        ...state,
        status: "over",
        bestScore: Math.max(state.bestScore, state.totalScore),
        bestScoreMoves:
          state.totalScore > state.bestScore
            ? state.totalMoves
            : state.bestScoreMoves,
      };
    case "tile/new":
      return { ...state, newTile: action.payload };
    case "game/login":
      return {
        ...state,
        bestScore: action.payload.bestScore,
        bestScoreMoves: action.payload.bestScoreMoves,
      };
    default:
      throw new Error("action unknown");
  }
}

export function MatrixProvider({ children }) {
  const [
    {
      status,
      board,
      totalScore,
      bestScore,
      newTile,
      totalMoves,
      bestScoreMoves,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    startNewGame();
  }, []);

  useKey("press", {
    onUp: handlePressUp,
    onDown: handlePressDown,
    onLeft: handlePressLeft,
    onRight: handlePressRight,
  });

  useEffect(
    function () {
      /* If the board is not completely filled, return. */
      if (board.filter((val) => val === 0).length !== 0) return;
      /* Check if there are any matching pairs left. Comparing current box with left box (if present) and up box (if present) */
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (c - 1 >= 0 && board[r * 4 + c] === board[r * 4 + (c - 1)]) return;
          if (r - 1 >= 0 && board[r * 4 + c] === board[(r - 1) * 4 + c]) return;
        }
      }
      /* Reaching here means that there are no pairs left. */
      dispatch({ type: "game/over" });
    },
    [board]
  );

  function initBest(bestScore, bestScoreMoves) {
    dispatch({ type: "game/login", payload: { bestScore, bestScoreMoves } });
  }

  function startNewGame() {
    let box_1 = getRandom(0, 15);
    let box_2 = getRandom(0, 15);
    while (box_2 === box_1) {
      box_2 = getRandom(0, 15);
    }
    let board = [...boardZero];
    board[box_1] = 2;
    board[box_2] = 2;
    dispatch({ type: "game/start", payload: board });
  }

  function handlePressUp() {
    if (status === "over") return;
    let boardN = [...boardZero];
    let score = 0;
    /* Looping through every column */
    for (let c = 0; c < 4; c++) {
      /* Storing the column values in the col array... */
      let col = [];
      for (let r = 0; r < 4; r++) {
        col.push(board[r * 4 + c]);
      }
      /* Filtering col array from zeros... */
      col = col.filter((val) => val !== 0);
      /* Merging pairs in col array... */
      for (let i = 0; i < col.length - 1; i++) {
        /* If pair found, [x,x] => [x+x, 0] */
        if (col[i] === col[i + 1]) {
          col[i] = 2 * col[i];
          col[i + 1] = 0;
          score += col[i];
          i++;
        }
      }
      /* Filtering col array from zeros which were introduced while merging pairs... */
      col = col.filter((val) => val !== 0);
      /* Pasting col array result onto c'th column of boardN... */
      for (let r = 0; r < col.length; r++) {
        boardN[r * 4 + c] = col[r];
      }
    }
    /* Check if the board underwent any change... */
    let isGenerateNew = shouldGenerate2(board, boardN);
    /* If the board changed, generate new 2 tile... */
    if (isGenerateNew) {
      boardN[generateNew2(boardN)] = 2;
    }
    /* Dispatching 'game/next' action... */
    dispatch({
      type: "game/next",
      payload: {
        boardN,
        score,
      },
    });
  }

  function handlePressDown() {
    if (status === "over") return;
    let boardN = [...boardZero];
    let score = 0;
    /* Looping through every column */
    for (let c = 0; c < 4; c++) {
      /* Storing the column values in the col array... */
      let col = [];
      for (let r = 3; r >= 0; r--) {
        col.push(board[r * 4 + c]);
      }
      /* Filtering col array from zeros... */
      col = col.filter((val) => val !== 0);
      /* Merging pairs in col array... */
      for (let i = 0; i < col.length - 1; i++) {
        /* If pair found, [x,x] => [x+x, 0] */
        if (col[i] === col[i + 1]) {
          col[i] = 2 * col[i];
          col[i + 1] = 0;
          score += col[i];
          i++;
        }
      }
      /* Filtering col array from zeros which were introduced while merging pairs... */
      col = col.filter((val) => val !== 0);
      /* Pasting col array result onto c'th column of boardN... */
      for (let r = 3; r > 3 - col.length; r--) {
        boardN[r * 4 + c] = col[3 - r];
      }
    }
    /* Check if the board underwent any change... */
    let isGenerateNew = shouldGenerate2(board, boardN);
    /* If the board changed, generate new 2 tile... */
    if (isGenerateNew) {
      boardN[generateNew2(boardN)] = 2;
    }
    /* Dispatching 'game/next' action... */
    dispatch({ type: "game/next", payload: { boardN, score } });
  }

  function handlePressLeft() {
    if (status === "over") return;
    let boardN = [...boardZero];
    let score = 0;
    /* Looping through every Row */
    for (let r = 0; r < 4; r++) {
      /* Storing row values in row array... */
      let row = [];
      for (let c = 0; c < 4; c++) {
        row.push(board[r * 4 + c]);
      }
      /* Filtering row array from zeros... */
      row = row.filter((val) => val !== 0);
      /* Merging pairs in row array... */
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
          row[i] = 2 * row[i];
          row[i + 1] = 0;
          score += row[i];
          i++;
        }
      }
      /* Filtering row array from zeros which were introduced while merging... */
      row = row.filter((val) => val !== 0);
      /* Pasting row array onto r'th row of new board... */
      for (let c = 0; c < row.length; c++) {
        boardN[r * 4 + c] = row[c];
      }
    }
    /* Check if the board underwent any change... */
    let isGenerateNew = shouldGenerate2(board, boardN);
    /* If the board changed, generate new 2 tile... */
    if (isGenerateNew) {
      boardN[generateNew2(boardN)] = 2;
    }
    /* Dispatching 'game/next' action... */
    dispatch({ type: "game/next", payload: { boardN, score } });
  }

  function handlePressRight() {
    if (status === "over") return;
    let boardN = [...boardZero];
    let score = 0;
    /* Looping through every Row */
    for (let r = 0; r < 4; r++) {
      /* Storing row values in row array... */
      let row = [];
      for (let c = 3; c >= 0; c--) {
        row.push(board[r * 4 + c]);
      }
      /* Filtering row array from zeros... */
      row = row.filter((val) => val !== 0);
      /* Merging pairs in row array... */
      for (let i = 0; i < row.length; i++) {
        if (row[i] === row[i + 1]) {
          row[i] = 2 * row[i];
          row[i + 1] = 0;
          score += row[i];
          i++;
        }
      }
      /* Filtering row array from zeros which were introduced while merging... */
      row = row.filter((val) => val !== 0);
      /* Pasting row array onto r'th row of new board... */
      for (let c = 3; c > 3 - row.length; c--) {
        boardN[r * 4 + c] = row[3 - c];
      }
    }
    /* Check if the board underwent any change... */
    let isGenerateNew = shouldGenerate2(board, boardN);
    /* If the board changed, generate new 2 tile... */
    if (isGenerateNew) {
      boardN[generateNew2(boardN)] = 2;
    }
    /* Dispatching 'game/next' action... */
    dispatch({ type: "game/next", payload: { boardN, score } });
  }

  function shouldGenerate2(oldBoard, newBoard) {
    for (let i = 0; i < newBoard.length; i++) {
      if (oldBoard[i] !== newBoard[i]) {
        return true;
      }
    }
    return false;
  }

  function generateNew2(latestBoard) {
    let empty = [];
    latestBoard.forEach((val, idx) => {
      if (val === 0) empty.push(idx);
    });
    let newTile = getRandomInArray(empty);
    dispatch({ type: "tile/new", payload: newTile });
    return newTile;
  }

  return (
    <MatrixContext.Provider
      value={{
        status,
        board,
        totalScore,
        bestScore,
        startNewGame,
        newTile,
        totalMoves,
        bestScoreMoves,
        handlePressRight,
        handlePressLeft,
        handlePressDown,
        handlePressUp,
        initBest,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}

function useMatrixProvider() {
  const matrix = useContext(MatrixContext);
  if (matrix === undefined)
    throw new Error("Using matrix context outside of scope");
  return matrix;
}

export default useMatrixProvider;
