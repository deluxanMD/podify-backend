import { RequestHandler } from 'express';
import * as yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body)
      return res.status(422).json({ error: 'Please profide the information' });

    const schemaToValidate = yup.object({ body: schema });

    try {
      await schemaToValidate.validate({ body: req.body }, { abortEarly: true });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(422).json({ error: error.message });
      }
    }
  };
};
