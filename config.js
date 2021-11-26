// Import the functions you need from the SDKs you need
import firebase from 'firebase';
require("@firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCnuu9ifjNL8gY4gsnkHNMjcRzEAtH2PKE",
  authDomain: "ball-8db0a.firebaseapp.com",
  databaseURL: "https://ball-8db0a-default-rtdb.firebaseio.com",
  projectId: "ball-8db0a",
  storageBucket: "ball-8db0a.appspot.com",
  messagingSenderId: "243330796590",
  appId: "1:243330796590:web:ada74aca47ea8bbfcc63bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore(); 