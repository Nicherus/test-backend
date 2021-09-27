import { Request, Response, NextFunction } from 'express';
import { validateId, 
	validateLogin, 
	validateRegisterUser, 
	validateUpdateUser, 
	validateUpdatePassword 
} from '../validations/validations';

export const registerUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const { username, password, email, phone } = request.body;

	if(!username || !password || !email || !phone) return response.status(422).send('Please check the data you are sending');

	const failValidation = validateRegisterUser(username, password, email, phone);
	
	if(failValidation) return response.status(400).send('Please, check the data you are sending');

	next();
};

export const getUserByIdMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const failValidation = validateId(request.params.id);
	
	if(failValidation) return response.status(400).send('Please, check the data you are sending');

	next();
};

export const updateUserMiddleware = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
	const { email, phone } = request.body;
	const userId = request.params.id;
	
	if(request.userId !== request.params.id) return response.status(401).send('Unauthorized');
	const failValidation = validateUpdateUser(email, phone, userId);
	
	if(failValidation) return response.status(400).send('Please, check the data you are sending');

	next();
};

export const updatePasswordMiddleware = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
	const { oldPassword, newPassword } = request.body;
	const userId = request.params.id;
	
	if(request.userId !== request.params.id) return response.status(401).send('Unauthorized');
	const failValidation = validateUpdatePassword(oldPassword, newPassword, userId);
	
	if(failValidation) return response.status(400).send('Please, check the data you are sending');

	next();
};

export const deleteUserMiddleware = async (request: any, response: Response, next: NextFunction): Promise<Response | void> => {
	if(request.userId !== request.params.id) return response.status(401).send('Unauthorized');

	const failValidation = validateId(request.params.id);
	
	if(failValidation) return response.status(400).send('Please, check the data you are sending');

	next();
};

export const loginMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const { username, password } = request.body;

	const loginValidation = validateLogin(username, password)

	if(loginValidation){
		return response.status(400).send('Please, check the data you are sending');
	}

	next();
}