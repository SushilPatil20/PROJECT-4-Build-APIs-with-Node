import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// ------------ Configuration for a firebase ------------
const firebaseConfig = {
    apiKey: "AIzaSyBaby66DIAnu-Y4EE_KDbfxMalmH6r-AyE",
    authDomain: "shoppyglobe-4c259.firebaseapp.com",
    projectId: "shoppyglobe-4c259",
    storageBucket: "shoppyglobe-4c259.appspot.com",
    messagingSenderId: "794377342501",
    appId: "1:794377342501:web:0a08320bbf2e11ae0db9cc"
};

const app = initializeApp(firebaseConfig);

// ------------ Getting access to fire base Storage ------------
export const storage = getStorage(app);

