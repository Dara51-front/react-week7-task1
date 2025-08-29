import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEJVQxalPpH-28dH5rM0JduS7yrgm_Q5s",
  authDomain: "todolist-41bea.firebaseapp.com",
  projectId: "todolist-41bea",
  storageBucket: "todolist-41bea.firebasestorage.app",
  messagingSenderId: "432644125914",
  appId: "1:432644125914:web:b5c0fba4dbc511eae4e1e3",
  databaseURL:
    "https://todolist-41bea-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
