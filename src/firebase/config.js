import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
import {getStorage}from 'firebase/storage'
// const firebaseConfig = {
//   apiKey: "AIzaSyDACPjmHWl3vd2OUED4PItHCLPmHG81HYQ",
//   authDomain: "halalitcar.firebaseapp.com",
//   projectId: "halalitcar",
//   storageBucket: "halalitcar.appspot.com",
//   messagingSenderId: "191051081126",
//   appId: "1:191051081126:web:f7bbc0ecf07bda6ab69b67",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCYb88It13ZgiZw-aRhV1n61xdf5zUNEXo",
  authDomain: "halalit-cars-210ea.firebaseapp.com",
  projectId: "halalit-cars-210ea",
  storageBucket: "halalit-cars-210ea.appspot.com",
  messagingSenderId: "875424730512",
  appId: "1:875424730512:web:bc8035edcc459ee63f7715"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)
