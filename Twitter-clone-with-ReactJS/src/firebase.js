// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhnZe8yL5TR9DSEmmJ_q_i_3DkMeFBJBE",
  authDomain: "twitter-clone-116ab.firebaseapp.com",
  projectId: "twitter-clone-116ab",
  storageBucket: "twitter-clone-116ab.appspot.com",
  messagingSenderId: "913267929912",
  appId: "1:913267929912:web:9ac37037d4a05250f5c7cd",
  measurementId: "G-TSDSPNXM1M",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
