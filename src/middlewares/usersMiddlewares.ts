import { Request, Response, NextFunction } from 'express';
import { validateId, validateRegisterUser, validateUpdateUser } from '../validations/validations';

export const registerUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const { username, password, email, phone } = request.body;

	if(!username || !password || !email || !phone) return response.status(422).send({error: 'Please check the data you are sending'});

	const failValidation = validateRegisterUser(username, password, email, phone);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const getUserByIdMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const failValidation = validateId(request.params.id);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const updateUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const { email, phone } = request.body;
	const userId = request.params.id;
	
	const failValidation = validateUpdateUser(email, phone, userId);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const deleteUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const failValidation = validateId(request.params.id);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};