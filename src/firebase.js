// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo6kWFpkQBytu7DT-nZipZsnksrUTP3h4",
  authDomain: "patient-management-39aa0.firebaseapp.com",
  projectId: "patient-management-39aa0",
  storageBucket: "patient-management-39aa0.firebasestorage.app",
  messagingSenderId: "1027055971168",
  appId: "1:1027055971168:web:6ca1ce4b5198425a744c05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };