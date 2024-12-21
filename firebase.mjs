// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let app;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
if (!getApps().length) {
  app = initializeApp({
    apiKey: "AIzaSyBnISrxT4XwZFDr2Kg_v9zvunjg0RyeaE8",
    authDomain: "groom202406-web.firebaseapp.com",
    databaseURL: "https://groom202406-web-default-rtdb.firebaseio.com",
    projectId: "groom202406-web",
    storageBucket: "groom202406-web.appspot.com",
    messagingSenderId: "597837975870",
    appId: "1:597837975870:web:87df76cff02eeb59031c6f",
    measurementId: "G-CFXRP9BS2J",
  });
} else {
  app = getApps()[0]; // Use the already-initialized app
}
// Initialize Firebase
export const database = getDatabase(app); // Realtime Database
