const functions = require('firebase-functions');

const h = require('preact').h;
const render = require('preact-render-to-string');

const express = require('express');
const app = express();

import {generateUrlName} from './utils/utils';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const html = content => `<!doctype html>
                  <head>
                    <title>Discursópolis</title>
                    <meta name="viewport"  content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="/style.css">
                  </head>
                  <body>
                    <div id='root'>${content}</div>
                    <!-- The core Firebase JS SDK is always required and must be listed first -->
                    <script src="/__/firebase/7.15.0/firebase-app.js"></script>

                    <!-- TODO: Add SDKs for Firebase products that you want to use
                         https://firebase.google.com/docs/web/setup#available-libraries -->
                    <script src="/__/firebase/7.15.0/firebase-analytics.js"></script>

                    <!-- Initialize Firebase -->
                    <script src="/__/firebase/init.js"></script>
                    <script type="text/javascript" src="/bundle.js"></script>
                  </body>
                </html>`;

app.put('/api/texts/:docId', (req, res) => {
  const doc = db.collection("texts").doc(req.params.docId);
  doc.update({
    name: req.body.name,
    text: req.body.text,
    intro: req.body.intro || '',
    conclusion: req.body.conclusion || '',
    tags: req.body.tags || [],
    tagIds: req.body.tags ? req.body.tags.map(tag => tag.id) : [],
    notes: req.body.notes,
    timestamp_update: admin.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    doc.get().then(doc => {
      res.json({
        id: doc.id,
        name: doc.data().name,
        text: doc.data().text,
        intro: doc.data().intro,
        conclusion: doc.data().conclusion,
        notes: doc.data().notes,
        tags: doc.data().tags,
        _success: 'Document updated'
      });
      return true;
    }).catch(err => console.log(err));
    return true;
  }).catch(err => console.log(err));
});

app.post('/api/texts/new', (req, res) => {
  const docId = generateUrlName(req.body.name);
  const docRef = db.collection("texts").doc(docId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      res.status(409).json({
        name: req.body.name,
        text: req.body.text,
        intro: req.body.intro || '',
        conclusion: req.body.conclusion || '',
        tags: req.body.tags,
        notes: req.body.notes,
        _error:'Document already exists'
      });
    } else {
      const timestamp = admin.firestore.FieldValue.serverTimestamp();

      docRef.set({
        name: req.body.name,
        text: req.body.text,
        intro: req.body.intro || '',
        conclusion: req.body.conclusion || '',
        notes: req.body.notes,
        tags: req.body.tags,
        tagIds: req.body.tags.map(tag => tag.id),
        timestamp_update: timestamp,
        timestamp: timestamp
      }).then(() => {
        docRef.get().then(doc => {
          res.json({
            id: doc.id,
            name: doc.data().name,
            text: doc.data().text,
            intro: doc.data().intro,
            conclusion: doc.data().conclusion,
            notes: doc.data().notes,
            tags: doc.data().tags,
          });
          return true;
        }).catch(err => console.log(err));
        return true;
      }).catch(err => console.log(err));
    }
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/texts/:docId', (req, res) => {
  db.collection('texts').doc(req.params.docId).get().then(doc => {
    res.json({
      id: doc.id,
      name: doc.data().name,
      text: doc.data().text,
      intro: doc.data().intro,
      conclusion: doc.data().conclusion,
      notes: doc.data().notes,
      tags: doc.data().tags
    });
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/texts', (req, res) => {
  const tags =  req.query.tags ? req.query.tags.split(',') : null;
  let col = db.collection('texts').orderBy("timestamp", "desc");

  if (tags) {
    col = col.where('tagIds','array-contains-any', tags)
  }

  col.get().then(snapshot => {
    const texts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name,
        tags: doc.data().tags,
      }
    });
    res.json({texts: texts});
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/tags/:tagId', (req, res) => {
  db.collection('tags').doc(req.params.tagId).get().then(doc => {
    res.json({
      id: doc.id,
      name: doc.data().name
    });
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/tags', (req, res) => {
  db.collection('tags').get().then(snapshot => {
    const tags = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name,
      }
    });
    res.json({tags: tags});
    return true;
  }).catch(err => console.log(err));
});

app.post('/api/tags/new', (req, res) => {
  const tagId = generateUrlName(req.body.name);
  const col = db.collection('tags');
  const docRef = col.doc(tagId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      col.get().then(snapshot => {
        const tags = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data().name,
          }
        });
        res.status(409).json({
          _error:'Tag already exists',
          tags: tags
        });
        return true;
      }).catch(err => console.log(err));
    } else {
      docRef.set({
        name: req.body.name,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        col.get().then(snapshot => {
          const tags = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              name: doc.data().name,
            }
          });
          res.json({
            _success: 'Tag created',
            tags: tags
          });
          return true;
        }).catch(err => console.log(err));
        return true;
      }).catch(err => console.log(err));
    }
    return true;
  }).catch(err => console.log(err));
});

app.get('**', (req, res) => {
  res.status(200).send(html(''));
});

exports.index = functions.https.onRequest(app);
