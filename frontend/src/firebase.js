import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVExKlASm6RjbikVwBjBPV7UurPNyC2Po",
  authDomain: "mahila-bachat-gat-521df.firebaseapp.com",
  projectId: "mahila-bachat-gat-521df",
  storageBucket: "mahila-bachat-gat-521df.firebasestorage.app",
  messagingSenderId: "700954664343",
  appId: "1:700954664343:web:cb35dc05af2647771bb8d2",
  measurementId: "G-73XWK8F7SX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
