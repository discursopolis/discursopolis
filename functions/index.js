const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const express = require('express');
const app = express();

app.get('/text/:id', (req, res) => {
  const textId = req.params.id;

  console.log(`Trying to get doc ${textId}`);

  db.collection('texts')
    .doc(textId)
    .get()
    .then(doc => {
      res.status(200).send(
        `<!doctype html>
                  <head>
                    <title>Discurse</title>
                  </head>
                  <body>
                    ${doc.data().text}
                  </body>
                </html>`);
      return true;
    }).catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  db.collection('texts')
    .get()
    .then(snapshot => {
      const els = [];
      snapshot.forEach(doc => {
        data = doc.data();
        els.push('<li><a href="/text/' + doc.id + '">' + data.name + '</a></li>');
      });
      res.status(200).send(
        `<!doctype html>
                  <head>
                    <title>Discurses</title>
                  </head>
                  <body>
                    <ul>
                    ${els.join('')}
                    </ul>
                  </body>
                </html>`);
      return true;
    }).catch(err => {
      console.log(err);
    });
});

exports.index = functions.https.onRequest(app);
