import * as express from 'express';
import Joi from 'joi';

function validate(
  requestKey: 'body' | 'params' | 'query',
  schema: Joi.AnySchema,
  shouldEndOnError: boolean,
) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const value = await schema.validateAsync(req[requestKey], {convert: true});
      req[requestKey] = value;
      return next();
    } catch (err) {
      if (shouldEndOnError) {
        return res.status(422).end();
      }
      return next(err);
    }
  };
}

export function validateBody(schema: Joi.ObjectSchema, shouldEndOnError = true) {
  return validate('body', schema, shouldEndOnError);
}

export function validateQuery(schema: Joi.ObjectSchema, shouldEndOnError = true) {
  return validate('query', schema, shouldEndOnError);
}
