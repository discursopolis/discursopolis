const functions = require('firebase-functions');

const h = require('preact').h;
const render = require('preact-render-to-string');

const express = require('express');
const app = express();
const cookies = require("cookie-parser");
const { body, validationResult } = require('express-validator');

app.use(cookies());

import {makeHTMLSafeText, generateUrlName} from './utils/utils';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const html = (content) => {
  content = content || {};
  const title = content.title ? makeHTMLSafeText(content.title) : 'Discursópolis';
  const description = content.description ?
    makeHTMLSafeText(content.description.slice(0, 160)) : 'Un sitio dedicado al Análisis del Discurso. Deconstruyendo discursos, construyendo igualdad.';
  const url = 'https://discursopolis.com' + (content.relativeURL || '');
  const body = content.body || '';

  return `<!doctype html>
            <head>
              <title>${title}</title>
              <meta name="description" content="${description}" />
              <meta property="og:title" content="${title}"/>
              <meta property="og:description" content="${description}" />
              <meta property="og:image" content="https://discursopolis.com/logo_meta_og.png" />
              <meta property="og:url" content="${url}" />
              <meta property="og:site_name" content="Discursópolis" />

              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="Discursópolis" />
              <meta name="twitter:creator" content="Discursópolis"/>
              <meta name="twitter:title" content="${title}"/>
              <meta name="twitter:description" content="${description}" />
              <meta name="twitter:image" content="https://discursopolis.com/logo_meta_og.png" />

              <link rel="icon" type="image/png" href="/logo_192x192.png" sizes="192x192" />
              <link rel="icon" type="image/png" href="/logo_32x32.png" sizes="32x32" />
              <link rel="icon" type="image/png" href="/logo_16x16.png" sizes="16x16" />

              <meta name="viewport"  content="minimum-scale=1, initial-scale=1, width=device-width" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <link rel="stylesheet" href="/style.css">
            </head>
            <body>
              <div id='root'>${body}</div>
              <!-- The core Firebase JS SDK is always required and must be listed first -->
              <script src="/__/firebase/7.15.0/firebase-app.js"></script>

              <!-- TODO: Add SDKs for Firebase products that you want to use
                   https://firebase.google.com/docs/web/setup#available-libraries -->
              <script src="/__/firebase/7.15.0/firebase-analytics.js"></script>
              <script src="/__/firebase/7.15.0/firebase-auth.js"></script>
              <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>

              <!-- Initialize Firebase -->
              <script src="/__/firebase/init.js"></script>
              <script type="text/javascript">
                ${ content.state && 'window.state=' + JSON.stringify(content.state) + ';' }
              </script>
              <script type="text/javascript" src="/bundle.js"></script>
            </body>
          </html>`
};

const protect = (req, res, successFnc, errorFnc) => {
  const sessionCookie = req.cookies.__session || '';
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      successFnc(decodedClaims);
    }).catch(function(error) {
      if (typeof errorFnc === 'function') {
        return errorFnc(error);
      };
      res.status(401).json({_error: 'Unauthorized!'});
      console.log(error);
    });
}

app.put('/api/texts/:docId', (req, res) => {
  protect(req, res, () => {
    const doc = db.collection("texts").doc(req.params.docId);
    doc.update({
      name: req.body.name,
      author: req.body.author,
      authorURL: req.body.authorURL,
      authorDescription: req.body.authorDescription,
      text: req.body.text,
      intro: req.body.intro,
      conclusion: req.body.conclusion,
      tags: req.body.tags || [],
      tagIds: req.body.tags ? req.body.tags.map(tag => tag.id) : [],
      notes: req.body.notes,
      hidden: req.body.hidden,
      timestamp_update: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      doc.get().then(doc => {
        res.json({
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          authorURL: doc.data().authorURL,
          authorDescription: doc.data().authorDescription,
          text: doc.data().text,
          intro: doc.data().intro,
          conclusion: doc.data().conclusion,
          notes: doc.data().notes,
          tags: doc.data().tags,
          hidden: doc.data().hidden,
          _success: 'Document updated'
        });
        return true;
      }).catch(err => console.log(err));
      return true;
    }).catch(err => console.log(err));
  });
});

app.post('/api/texts/new', (req, res) => {
  protect(req, res, () => {
    const docId = generateUrlName(req.body.name);
    const docRef = db.collection("texts").doc(docId);
    docRef.get().then((doc) => {
      if (doc.exists) {
        res.status(409).json({
          name: req.body.name,
          author: req.body.author,
          authorURL: req.body.authorURL,
          authorDescription: req.body.authorDescription,
          text: req.body.text,
          intro: req.body.intro,
          conclusion: req.body.conclusion,
          tags: req.body.tags,
          notes: req.body.notes,
          hidden: req.body.hidden,
          _error:'Document already exists'
        });
      } else {
        const timestamp = admin.firestore.FieldValue.serverTimestamp();

        docRef.set({
          name: req.body.name,
          author: req.body.author,
          authorURL: req.body.authorURL,
          authorDescription: req.body.authorDescription,
          text: req.body.text,
          intro: req.body.intro,
          conclusion: req.body.conclusion,
          notes: req.body.notes,
          tags: req.body.tags,
          tagIds: req.body.tags.map(tag => tag.id),
          hidden: req.body.hidden,
          timestamp_update: timestamp,
          timestamp: timestamp
        }).then(() => {
          docRef.get().then(doc => {
            res.json({
              id: doc.id,
              name: doc.data().name,
              author: doc.data().author,
              authorURL: doc.data().authorURL,
              authorDescription: doc.data().authorDescription,
              text: doc.data().text,
              intro: doc.data().intro,
              conclusion: doc.data().conclusion,
              notes: doc.data().notes,
              tags: doc.data().tags,
              hidden: doc.data().hidden
            });
            return true;
          }).catch(err => console.log(err));
          return true;
        }).catch(err => console.log(err));
      }
      return true;
    }).catch(err => console.log(err));
  });
});

app.delete('/api/texts/:docId', (req, res) => {
  protect(req, res, () => {
    const doc = db.collection("texts").doc(req.params.docId);
    doc.delete().then(() => {
      res.json({
        deleted: true
      });
      return true;
    }).catch(err => console.log(err));
  });
});

app.get('/api/texts/:docId', (req, res) => {
  db.collection('texts').doc(req.params.docId).get().then(doc => {
    const docContent = {
      id: doc.id,
      name: doc.data().name,
      author: doc.data().author,
      authorURL: doc.data().authorURL,
      authorDescription: doc.data().authorDescription,
      text: doc.data().text,
      intro: doc.data().intro,
      conclusion: doc.data().conclusion,
      notes: doc.data().notes,
      tags: doc.data().tags,
      hidden: doc.data().hidden
    };

    protect(req, res, () => {
      res.json(docContent);
      return true;
    }, (error) => {
      if (!docContent.hidden) {
        res.json(docContent);
        return true;
      }
      res.status(404).json({_error: 'Text not found!'});
      return false;
    });
  }).catch(err => {
    console.log(err);
    res.status(404).json({_error: 'Text not found!'});
  });
});

const lastTs = (texts) => texts.length > 0 ? texts[texts.length - 1].timestamp : null;

app.get('/api/texts', (req, res) => {
  const tags =  req.query.tags ? req.query.tags.split(',') : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const startAfter = req.query.startAfter || null;

  let col = db.collection('texts').orderBy("timestamp", "desc");

  if (tags) {
    col = col.where('tagIds','array-contains-any', tags);
  }

  if (startAfter) {
    col = col.startAfter(admin.firestore.Timestamp.fromMillis(startAfter));
  }

  if (limit) {
    col = col.limit(limit);
  }

  col.get().then(snapshot => {
    const texts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name,
        tags: doc.data().tags,
        hidden: doc.data().hidden,
        timestamp: doc.data().timestamp.toMillis()
      }
    });

    const areRemainingTexts = limit && texts.length == limit;

    protect(req, res, () => {
      res.json({texts: texts, lastTs: lastTs(texts), areRemainingTexts: areRemainingTexts});
      return true;
    }, (error) => {
      // Non-admin users get only the visible texts
      res.json({texts: texts.filter(text => !text.hidden), lastTs: lastTs(texts), areRemainingTexts: areRemainingTexts});
      return true;
    });
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

app.delete('/api/tags/:tagId', (req, res) => {
  protect(req, res, () => {
    db.collection('tags').doc(req.params.tagId).delete().then(() => {
      res.json({
        deleted: true
      });
      return true;
    }).catch(err => console.log(err));
  });
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
  protect(req, res, () => {
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
});

app.post('/api/subscriber', [body('email').isEmail().normalizeEmail()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const col = db.collection('subscribers');
  const docRef = col.doc(email);

  docRef.set({
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    res.json({
      _success: 'Subscribed'
    });
    return true;
  }).catch(err => console.log(err));
});

app.get('/api/subscribers.csv', (req, res) => {
  protect(req, res, () => {
    db.collection('subscribers').get().then(snapshot => {
      const subscribers = snapshot.docs.map(doc => doc.id);
      const csv = ['email'].concat(subscribers).join("\n");
      res.header('Content-Type', 'text/csv');
      res.attachment('subscribers.csv');
      res.status(200).send(csv);
    });
  });
});

app.get('/api/auth', (req, res) => {
  protect(req, res, () => {
    res.json({status: 'success'});
  });
});

app.post('/api/auth', (req, res) => {
  const idToken = req.body.idToken;
  admin.auth().verifyIdToken(idToken).then(decodedToken => {
    db.collection('users').doc(decodedToken.email).get().then(user => {
      if (user.data().admin) {
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        admin.auth().createSessionCookie(idToken, {expiresIn})
          .then((sessionCookie) => {
            const options = {maxAge: expiresIn, httpOnly: true};
            res.cookie('__session', sessionCookie, options);
            res.json({status: 'success'});
          }, error => {
            console.log(error);
            res.status(401).send('UNAUTHORIZED REQUEST!');
          });

      } else {
        console.log('User is not admin');
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    }).catch(function(error) {
      console.log(error);
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
  }).catch(function(error) {
    console.log(error);
  });
});

// For each text, we pre-render title, description and URL
app.get('/texts/:docId', (req, res) => {
  db.collection('texts').doc(req.params.docId).get().then(doc => {
    const state = {
      id: doc.id,
      name: doc.data().name,
      author: doc.data().author,
      authorURL: doc.data().authorURL,
      authorDescription: doc.data().authorDescription,
      text: doc.data().text,
      intro: doc.data().intro,
      conclusion: doc.data().conclusion,
      notes: doc.data().notes,
      tags: doc.data().tags,
      hidden: doc.data().hidden
    };
    if (state.hidden) {
      res.status(404).send(html());
    }
    res.status(200).send(html({title: state.name, description: state.intro || state.text, relativeURL: req.url, state: state}));
  }).catch(function(error) {
    console.log(error);
    res.status(404).send(html());
  });
});

// For each tag, we pre-render title, description and URL
app.get('/tags/:tagId', (req, res) => {
  db.collection('tags').doc(req.params.tagId).get().then(doc => {
    const state = {
      id: doc.id,
      name: doc.data().name
    }
    res.status(200).send(html({title: state.name, relativeURL: req.url, state: state}));
  }).catch(error => {
    console.log(error);
    res.status(404).send(html());
  });
});

app.get('**', (req, res) => {
  res.status(200).send(html());
});

exports.index = functions.https.onRequest(app);
