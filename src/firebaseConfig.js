
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDx6LHwrwAcRlI_bGk6vJcpxhyCSwDuB6g",
  authDomain: "shiftacademyg14.firebaseapp.com",
  projectId: "shiftacademyg14",
  storageBucket: "shiftacademyg14.appspot.com",
  messagingSenderId: "32608662634",
  appId: "1:32608662634:web:2af9c044f916f78bdf8613"
};
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app)
export const auth = getAuth(app)