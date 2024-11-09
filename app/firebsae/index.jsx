// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyDiMq46p-MkIkXM5yH2RJ1la0DEHF-DXqc",
    authDomain: "mymovie-37cf7.firebaseapp.com",
    projectId: "mymovie-37cf7",
    storageBucket: "mymovie-37cf7.appspot.com",
    messagingSenderId: "103040249183",
    appId: "1:103040249183:web:55900afa4f58ff0beadaea",
    measurementId: "G-MBW954N2MH"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
