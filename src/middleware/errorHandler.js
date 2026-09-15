import createHttpError from 'http-errors';

const { HttpError } = createHttpError;

export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : 500;

  res.status(status).json({
    message: err.message,
  });
};