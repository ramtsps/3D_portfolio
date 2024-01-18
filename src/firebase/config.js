import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBjNwcgaprlSQu_WtHfnfc0NpgQgNDQYc",
  authDomain: "portfolio-deaf2.firebaseapp.com",
  projectId: "portfolio-deaf2",
  storageBucket: "portfolio-deaf2.appspot.com",
  messagingSenderId: "556393924694",
  appId: "1:556393924694:web:37d7ce6e81bd18fadcd3f7",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage();

export { db, storage };
