import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, _res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  if (!sessionId) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (!isValidObjectId(sessionId)) {
    return next(createHttpError(401, 'Session not found'));
  }

  const session = await Session.findOne({ _id: sessionId, accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;

  return next();
};