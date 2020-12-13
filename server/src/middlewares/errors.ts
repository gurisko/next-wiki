import * as express from 'express';

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err?.name === 'MongoError' && err?.code === 11000) {
    return res.status(409).end();
  }
  return res.status(500).end();
}