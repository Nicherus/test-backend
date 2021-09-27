import { Request, Response, NextFunction } from 'express';

export const bracketsTestMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	
	if(!request.body.inputBrackets) return response.status(400).send('Please, check the data you are sending');

	next();
};