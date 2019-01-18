import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post('/', (req, res) => {
  console.log('body', req.body);
  res.sendStatus(201);
});

// Expose Express API as a single Cloud Function:
exports.dashboard = functions.https.onRequest(app);
