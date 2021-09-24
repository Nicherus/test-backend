import jwt from 'jsonwebtoken';
import { HttpError } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';

export const verifyJWT = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
  const token: any = request.headers['x-access-token'];
  if (!token)  throw new HttpError(401, 'token needed');

  jwt.verify(token, process.env.SECRET, (err: any, decoded: { id: any; }) => {
    if (err) throw new HttpError(401, 'please, send this to a developer');

    request.userId = decoded.id;
    next();
  });
}