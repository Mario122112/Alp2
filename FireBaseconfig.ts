// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpJrsfQm9z3BYT-p08NA-vf_epz6_cmIY",
  authDomain: "paquito2.firebaseapp.com",
  projectId: "paquito2",
  storageBucket: "paquito2.firebasestorage.app",
  messagingSenderId: "510558927273",
  appId: "1:510558927273:web:fbc9bdffdccb928830ecb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const db = getFirestore(app);

