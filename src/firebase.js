// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_phAgAvYNdNgyktmRIP7v9XA1Nj1ev5I",
  authDomain: "luxx-50278.firebaseapp.com",
  projectId: "luxx-50278",
  storageBucket: "luxx-50278.appspot.com",
  messagingSenderId: "187422009578",
  appId: "1:187422009578:web:deee83695f381398ac8f93",
  measurementId: "G-RDKLTG6G96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { analytics, provider, auth, db };

// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch((error) => {
//     console.log(error);
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
