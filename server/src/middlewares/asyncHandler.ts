import * as express from 'express';

export function asyncHandler(fn: express.RequestHandler): express.RequestHandler {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (err) {
      return next(err);
    }
  };
}
