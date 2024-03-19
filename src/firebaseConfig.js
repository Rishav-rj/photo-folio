// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEMx4oO6rYMpDcfXpQANul09tF_pFE0xM",
  authDomain: "photofolio-app-8e8a7.firebaseapp.com",
  projectId: "photofolio-app-8e8a7",
  storageBucket: "photofolio-app-8e8a7.appspot.com",
  messagingSenderId: "48707744879",
  appId: "1:48707744879:web:b44b052a5a9bf1be58499a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);