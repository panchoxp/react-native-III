// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPRf-Xz-sEUiA8bcVqAjZ3LVLbIw4WCSg",
  authDomain: "complexivo-9bbe5.firebaseapp.com",
  projectId: "complexivo-9bbe5",
  storageBucket: "complexivo-9bbe5.appspot.com",
  messagingSenderId: "265054715396",
  appId: "1:265054715396:web:cd90cab32a30421111bf51",
  measurementId: "G-PTCZ1QQ1CK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});