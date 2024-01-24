import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useReducer } from "react";
import { auth, provider } from "../firebase";

const authContext = createContext();

const initialAuth = {
  username: "",
  email: "",
  isLoggedIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        isLoggedIn: true,
      };
    case "logout":
      return { ...state, isLoggedIn: false };
    default:
      throw new Error("Unknown action");
  }
}

export function AuthProvider({ children }) {
  const [{ username, email, isLoggedIn }, dispatch] = useReducer(
    reducer,
    initialAuth
  );

  function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        let user_data = getAdditionalUserInfo(result);
        let profile = {
          username: user_data.profile.given_name,
          email: user_data.profile.email,
        };
        dispatch({ type: "login", payload: profile });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        dispatch({ type: "logout" });
      })
      .catch((error) => {});
  }

  return (
    <authContext.Provider
      value={{ login, logout, username, email, isLoggedIn }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(authContext);
  if (auth === null) throw new Error("Auth out of scope");
  return auth;
}

export default useAuth;
