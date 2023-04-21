import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
      apiKey: "AIzaSyBLiFFZe8w4JjMc_sLVG8Ol6ISh6gB46lI",
      authDomain: "bikeshop-ed68c.firebaseapp.com",
      databaseURL: "https://bikeshop-ed68c-default-rtdb.firebaseio.com",
      projectId: "bikeshop-ed68c",
      storageBucket: "bikeshop-ed68c.appspot.com",
      messagingSenderId: "373595041006",
      appId: "1:373595041006:web:08f2db470b23ce523897ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export { database };
