// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBii_AFjNVGsUlqnShebjME_zp0muijXJg",
  authDomain: "wellwigen-df707.firebaseapp.com",
  projectId: "wellwigen-df707",
  storageBucket: "wellwigen-df707.firebasestorage.app",
  messagingSenderId: "824000097276",
  appId: "1:824000097276:web:2e66a855e2abd529afe079"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
