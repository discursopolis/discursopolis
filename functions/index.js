"use strict";

var _app = _interopRequireDefault(require("./components/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/grids-responsive-min.css">
                    <link rel="stylesheet" href="/style.css">
                  </head>
                  <body>
                    <div id='root'>${content}</div>
                    <script type="text/javascript" src="/bundle.js"></script>
                  </body>
                </html>`;

app.get('/api/text/:docId', (req, res) => {
  db.collection('texts').doc(req.params.docId).get().then(doc => {
    res.json({
      id: doc.id,
      name: doc.data().name,
      text: doc.data().text,
      notes: doc.data().notes
    });
    return true;
  }).catch(err => console.log(err));
});
app.get('/api/texts', (req, res) => {
  db.collection('texts').get().then(snapshot => {
    const texts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name
      };
    });
    res.json({
      texts: texts
    });
    return true;
  }).catch(err => console.log(err));
});
app.get('**', (req, res) => {
  res.status(200).send(html(render(h(_app.default, null))));
});
exports.index = functions.https.onRequest(app);