import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CirclePayload } from './circle-payload';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ci-dashboard-db276.firebaseio.com'
});

const db = admin.database();
const projects = db.ref("projects");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post('/', async (req, res) => {
  console.log('body', req.body);
  const { payload } = req.body as { payload: CirclePayload};

  const { user, reponame, status, committer_date } = payload;

  await projects.child(payload.reponame).push().set({
    user,
    reponame,
    status,
    committer_date,
  })

  return res.sendStatus(201);
});

// Expose Express API as a single Cloud Function:
exports.dashboard = functions.https.onRequest(app);
