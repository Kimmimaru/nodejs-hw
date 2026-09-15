import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : err.status || 500;
  const message =
    err instanceof HttpError ? err.message || err.name : err.message;

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    message,
  });
};