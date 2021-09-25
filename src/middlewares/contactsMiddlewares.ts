import { Request, Response, NextFunction } from 'express';
import { 
	validateId, 
	validateContact
} from '../validations/validations';

export const createContactMiddleware = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
	const { name, email, phone } = request.body;

	if(request.userId !== request.params.id) return response.status(401).send({error: 'Unauthorized'});
	if(!name || !email || !phone) return response.status(422).send({error: 'Please check the data you are sending'});

	const failValidation = validateContact(name, email, phone);

	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const updateContactMiddleware = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
	const { name, email, phone } = request.body;

	const failValidation = validateContact(name, email, phone);
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

export const checkIdMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const id = request.params.id;
	
	const failValidation = validateId(id);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};

