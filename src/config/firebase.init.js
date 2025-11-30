// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe-kZMNXQiyAvCY5AcIR90mliFylQnGhA",
  authDomain: "isam-auto.firebaseapp.com",
  projectId: "isam-auto",
  storageBucket: "isam-auto.firebasestorage.app",
  messagingSenderId: "912295632763",
  appId: "1:912295632763:web:ebf76668006127f36b67de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);