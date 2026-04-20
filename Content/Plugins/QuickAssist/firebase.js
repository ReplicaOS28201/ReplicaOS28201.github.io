import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClsOvXFunSyZXOKNIEGFTM8etLw6lQgH4",
  authDomain: "os67z9zp.firebaseapp.com",
  databaseURL: "https://os67z9zp-default-rtdb.firebaseio.com",
  projectId: "os67z9zp",
  storageBucket: "os67z9zp.firebasestorage.app",
  messagingSenderId: "864031752567",
  appId: "1:864031752567:web:4be14d5cab7d162c5ce172",
  measurementId: "G-GRYPDQFHTY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
