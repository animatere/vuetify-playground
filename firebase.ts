import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq6Re3NW-TdgyU1V8jWO7P8L5WTCO_nvQ",
  authDomain: "vue3-training-2f8fd.firebaseapp.com",
  databaseURL: "https://vue3-training-2f8fd-default-rtdb.firebaseio.com",
  projectId: "vue3-training-2f8fd",
  storageBucket: "vue3-training-2f8fd.firebasestorage.app",
  messagingSenderId: "613426925077",
  appId: "1:613426925077:web:f20ddc79b0797b96e8881c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
