import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getCiType, CIType } from './helper';
import { parseCircle } from './parsers/circle-parser';
import { DashboardData } from './interfaces/dashboard-data';
import { parseGitlab } from './parsers/gitlab-parser';

admin.initializeApp();

const db = admin.database();
const projects = db.ref('projects');

function getData(body: any, type?: CIType) {
  switch (type) {
    case CIType.CIRCLE_CI: {
      return parseCircle(body);
    }
    case CIType.GITLAB_CI: {
      return parseGitlab(body);
    }
  }
  return null;
}

const app = express();
app.use(cors({ origin: true }));
app.post('/', async (req, res) => {
  console.log('bb', req.body);
  const type = getCiType(req.body);
  console.log('type', type);
  const data: DashboardData | null = getData(req.body, type);

  console.log('data', data);

  if (!data) {
    console.log('body', req.body);
    return res.sendStatus(500);
  }

  await projects
    .child(data.project)
    .push()
    .set({
      ...data,
    });

  await projects
    .child(data.project)
    .orderByChild('startedAt')
    .once('value', ss => {
      const len = Object.keys(ss.val()).length - 6;
      if (len > 0) {
        const kk = Object.keys(ss.val()).slice(0, len);
        if (kk.length > 0) {
          return Promise.all([
            kk.map(k =>
              projects
                .child(data.project)
                .child(k)
                .remove(),
            ),
          ]);
        }
      }
      return Promise.resolve();
    });

  return res.sendStatus(201);
});

exports.dashboard = functions.https.onRequest(app);
