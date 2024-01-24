import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import useAuth from "./AuthProvider";
import useMatrixProvider from "./MatrixProvider";
import {
  FIND_PLAYER_BY_EMAIL,
  PLAYERS_COL_REF,
} from "../Constants/DbConstants";

let dbContext = createContext();

export function DbProvider({ children }) {
  const [docId, setDocId] = useState("");
  const [player, setPlayer] = useState({});
  const [isNewUser, setIsNewUser] = useState(true);
  const { username, email, isLoggedIn } = useAuth();
  const {
    status,
    totalScore,
    bestScore,
    totalMoves,
    bestScoreMoves,
    initBest,
  } = useMatrixProvider();

  useEffect(
    function () {
      if (isLoggedIn) {
        getPlayer();
      }
    },
    [isLoggedIn]
  );

  useEffect(
    function () {
      let isGameOver = status === "over";
      if (isLoggedIn && isGameOver) {
        addGame();
      }
      async function addGame() {
        const GAME_COL_REF = collection(db, "players", docId, "games");
        try {
          let isNewRecordSet = totalScore > player.bestScore;
          if (isNewRecordSet) {
            const player_doc = await updateDoc(doc(db, "players", docId), {
              bestScore: totalScore,
              bestScoreMoves: totalMoves,
            });
            const updated_player = {
              ...player,
              bestScore: totalScore,
              bestScoreMoves: totalMoves,
            };
            setPlayer(updated_player);
          }
          const game_stats = {
            bestScore,
            bestScoreMoves,
            totalScore,
            totalMoves,
            playedAt: new Date().toISOString(),
          };
          const game_ref = await addDoc(GAME_COL_REF, game_stats);
          console.log(
            `New game with player id = ${docId} game id = ${game_ref.id} added.`
          );
        } catch (e) {
          console.error(e);
        }
      }
    },
    [docId, status]
  );

  async function getPlayer() {
    try {
      const players_found_by_email = await getDocs(FIND_PLAYER_BY_EMAIL(email));
      let no_players_found = players_found_by_email.empty;
      if (!no_players_found) {
        setDocId(players_found_by_email.docs[0].id);
        let player_by_email = players_found_by_email.docs[0].data();
        setIsNewUser(false);
        setPlayer(player_by_email);
        initBest(player_by_email.bestScore, player_by_email.bestScoreMoves);
      } else {
        setIsNewUser(true);
        addPlayer();
      }
    } catch (e) {
      console.error(`Couldn't get player ${e}`);
    }
  }

  async function addPlayer() {
    try {
      const new_player_data = {
        username,
        email,
        createdAt: new Date().toISOString(),
        bestScore: 0,
        bestScoreMoves: 0,
      };
      const new_player = await addDoc(PLAYERS_COL_REF, new_player_data);
      setDocId(new_player.id);
      setPlayer(new_player_data);
    } catch (e) {
      console.error(`Couldn't update player ${e}`);
    }
  }

  return <dbContext.Provider value={{}}>{children}</dbContext.Provider>;
}

function useDbContext() {
  let db = useContext(dbContext);
  if (db === null) throw new Error("db context is undefined");
  return db;
}

export default useDbContext;
