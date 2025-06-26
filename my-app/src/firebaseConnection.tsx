import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK2w3p5WxCGLHKYnSuLWp6VrMCZaZM_ko",
  authDomain: "shopping-cart-f597f.firebaseapp.com",
  projectId: "shopping-cart-f597f",
  storageBucket: "shopping-cart-f597f.firebasestorage.app",
  messagingSenderId: "498960573635",
  appId: "1:498960573635:web:f1a6e24adfc33910a06e76"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,auth};