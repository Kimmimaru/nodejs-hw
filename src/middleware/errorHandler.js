import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message =
    err instanceof HttpError ? err.message || err.name : err.message;

  res.status(status).json({
    message,
  });
};