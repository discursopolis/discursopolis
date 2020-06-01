'use strict';

const express = require('express');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase services that you want to use
require("firebase/auth");
require("firebase/firestore");

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyBa2AgTY98IpLF3zGzEL2Fv1sLeINs5MHo",
  authDomain: "crlf-d8b04.firebaseapp.com",
  databaseURL: "https://crlf-d8b04.firebaseio.com",
  projectId: "crlf-d8b04",
  storageBucket: "crlf-d8b04.appspot.com",
  messagingSenderId: "45156535686",
  appId: "1:45156535686:web:80cb906b38ca365bad3007",
  measurementId: "G-GTEF8CM13C"
};

firebase.initializeApp(firebaseConfig);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
