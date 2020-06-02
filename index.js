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
                  </head>
                  <body>
                    <div id='root'>${content}</div>
                    <script type="text/javascript" src="bundle.js"></script>
                  </body>
                </html>`;

import App from './components/app';

app.get('/api/text/:docId', (req, res) => {
    db.collection('texts').doc(req.params.docId).get().then(doc => {
      res.json({
          id: doc.id,
          name: doc.data().name,
          text: doc.data().text
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
    res.status(200).send(html(
        render(<App />)
      )
    );
});

exports.index = functions.https.onRequest(app);
