import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3E7ggOxtwMAZdkbBu-h5MI_4di3VRR5c",
  authDomain: "miniblog-dc9f3.firebaseapp.com",
  projectId: "miniblog-dc9f3",
  storageBucket: "miniblog-dc9f3.firebasestorage.app",
  messagingSenderId: "586031885759",
  appId: "1:586031885759:web:b799cc200c24233560050a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
