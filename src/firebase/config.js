import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBodUkpm_CsoVBAIAs149NQjur8cKD_wcs",
  authDomain: "react-js-ecommerse-cheapbuy.firebaseapp.com",
  projectId: "react-js-ecommerse-cheapbuy",
  storageBucket: "react-js-ecommerse-cheapbuy.appspot.com",
  messagingSenderId: "577990134187",
  appId: "1:577990134187:web:584bc4db847566459b6aee"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const database = getFirestore(firebase);

export {database};


