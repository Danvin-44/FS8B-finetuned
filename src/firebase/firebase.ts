import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8ahwDR4urxnHEffVx_G3f5sQlVwAgBkY",
  authDomain: "sapp-6a8d6.firebaseapp.com",
  projectId: "sapp-6a8d6",
  storageBucket: "sapp-6a8d6.firebasestorage.app",
  messagingSenderId: "88390885589",
  appId: "1:88390885589:web:f0224b18357e34ea0d025c",
  measurementId: "G-GJ4EQ0TTJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
