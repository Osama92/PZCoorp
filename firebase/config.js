import * as firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAULVGYJ-5aQBGortb52f5NqAKUEx9jH80",
    authDomain: "pzcoorp.firebaseapp.com",
    databaseURL: "https://pzcoorp.firebaseio.com",
    projectId: "pzcoorp",
    storageBucket: "pzcoorp.appspot.com",
    messagingSenderId: "937314981045",
    appId: "1:937314981045:web:b566fba3d56372f3821afc",
    measurementId: "G-8H1QC0C2C0"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
  }

  export {firebase}