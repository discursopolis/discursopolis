const functions = require('firebase-functions');

exports.discourse = functions.https.onRequest((req, res) => {
  // const original = req.query.text
  res.status(200).send(
  `<!doctype html>
    <head>
      <title>Discurse</title>
    </head>
    <body>
      Este es un discurso
    </body>
  </html>`);
});
