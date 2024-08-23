import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const PLAYERS_COL_REF = collection(db, "players");

export const FIND_PLAYER_BY_EMAIL = (email) =>
  query(PLAYERS_COL_REF, where("email", "==", email));

export const GET_TOP_10_PLAYERS = query(
  PLAYERS_COL_REF,
  orderBy("bestScore", "desc"),
  limit(10)
);
