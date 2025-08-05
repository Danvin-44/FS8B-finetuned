// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8ahwDR4urxnHEffVx_G3f5sQlVwAgBkY",
  authDomain: "sapp-6a8d6.firebaseapp.com",
  projectId: "sapp-6a8d6",
  storageBucket: "sapp-6a8d6.firebasestorage.app",
  messagingSenderId: "88390885589",
  appId: "1:88390885589:web:f0224b18357e34ea0d025c",
  measurementId: "G-GJ4EQ0TTJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
