const functions = require('firebase-functions');
const admin = require('firebase-admin');

const h = require('preact').h;
const render = require('preact-render-to-string');

admin.initializeApp();
const db = admin.firestore();
const express = require('express');
const app = express();

const html = require('./components/app').html;
const Text = require('./components/app').Text;
const MainList = require('./components/app').MainList;

app.get('/text/:id', (req, res) => {
  const textId = req.params.id;

  console.log(`Trying to get doc ${textId}`);

  db.collection('texts').doc(textId).get().then(doc => {
    res.status(200).send(html(render(h(Text, { text: doc.data().text }))));
    return true;
  }).catch(err => {
    console.log(err);
  });
});

app.get('/', (req, res) => {
  db.collection('texts').get().then(snapshot => {
    const els = [];
    snapshot.forEach(doc => {
      data = doc.data();
      els.push({ id: doc.id, name: data.name });
    });
    res.status(200).send(html(render(h(MainList, { els: els }))));
    return true;
  }).catch(err => {
    console.log(err);
  });
});

exports.index = functions.https.onRequest(app);