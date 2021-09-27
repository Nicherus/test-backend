import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

export const verifyJWT = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
  const token = request.headers['x-access-token'];

  if (!token) {
    response.status(401).send("token needed");
  } else {
    jwt.verify(token, process.env.SECRET, (err: any, decoded: { id: any; }) => {
      if (err) response.status(401).send("Please, send this to a developer");
  
      request.userId = decoded.id;
      next();
    });
  }
}