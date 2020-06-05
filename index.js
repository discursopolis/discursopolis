const functions = require('firebase-functions');

const h = require('preact').h;
const render = require('preact-render-to-string');

const express = require('express');
const app = express();

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const html = content => `<!doctype html>
                  <head>
                    <title>CtrlF</title>
                    <meta name="viewport"  content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="/style.css">
                  </head>
                  <body>
                    <div id='root'>${content}</div>
                    <script type="text/javascript" src="/bundle.js"></script>
                  </body>
                </html>`;

app.put('/api/text/:docId', (req, res) => {
  const doc = db.collection("texts").doc(req.params.docId);
  doc.update({
    name: req.body.name,
    text: req.body.text,
    intro: req.body.intro || '',
    conclusion: req.body.conclusion || '',
    notes: req.body.notes,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    doc.get().then(doc => {
      res.json({
          id: doc.id,
          name: doc.data().name,
          text: doc.data().text,
          intro: doc.data().intro,
          conclusion: doc.data().conclusion,
          notes: doc.data().notes,
          timestamp: doc.data().timestamp,
      });
      return true;
    }).catch(err => console.log(err));
    return true;
  }).catch(err => console.log(err));
});

app.post('/api/text/new', (req, res) => {
  const col = db.collection("texts");
  col.add({
    name: req.body.name,
    text: req.body.text,
    intro: req.body.intro || '',
    conclusion: req.body.conclusion || '',
    notes: req.body.notes,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  }).then(docRef => {
    docRef.get().then(doc => {
      res.json({
          id: doc.id,
          name: doc.data().name,
          text: doc.data().text,
          intro: doc.data().intro,
          conclusion: doc.data().conclusion,
          notes: doc.data().notes,
          timestamp: doc.data().timestamp,
      });
      return true;
    }).catch(err => console.log(err));
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/text/:docId', (req, res) => {
    db.collection('texts').doc(req.params.docId).get().then(doc => {
      res.json({
          id: doc.id,
          name: doc.data().name,
          text: doc.data().text,
          intro: doc.data().intro,
          conclusion: doc.data().conclusion,
          notes: doc.data().notes,
          timestamp: doc.data().timestamp,
      });
      return true;
    }).catch(err => console.log(err));
});

app.get('/api/texts', (req, res) => {
    db.collection('texts').get().then(snapshot => {
      const texts = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name,
        }
      });
      res.json({texts: texts});
      return true;
    }).catch(err => console.log(err));
});

app.get('**', (req, res) => {
    res.status(200).send(html(''));
});

exports.index = functions.https.onRequest(app);
