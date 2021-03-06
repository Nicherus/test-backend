import { Request, Response, Router } from 'express';

import { 
	registerUserMiddleware, 
	getUserByIdMiddleware, 
	updateUserMiddleware, 
	deleteUserMiddleware, 
	loginMiddleware,
	updatePasswordMiddleware
} from '../middlewares/usersMiddlewares';

import usersController from '../controllers/usersController';
import { verifyJWT } from '../middlewares/authMiddleware';

const users = Router();

users.post('/register', registerUserMiddleware, async (request: Request, response: Response): Promise<Response> => {

	try{
		const user = await usersController.registerUser(request.body.username, request.body.password, request.body.email, request.body.phone);
		return response.status(200).send(user);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.post('/login', loginMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const data = await usersController.login(request.body.username, request.body.password);
		return response.status(200).send(data);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.get('/', async (request: Request, response: Response): Promise<Response> => {
	try{
		const users = await usersController.getAllUsers();
		return response.status(200).send(users);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.get('/:id', getUserByIdMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const user = await usersController.getUserById(request.params.id);
		return response.status(200).send(user);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.put('/:id', verifyJWT, updateUserMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const user = await usersController.updateUser(request.params.id, request.body.email, request.body.phone);
		return response.status(200).send(user);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.delete('/:id', verifyJWT, deleteUserMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const userDeleted = await usersController.deleteUser(request.params.id);
		return response.status(200).send(userDeleted);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

users.put('/password/:id', verifyJWT, updatePasswordMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const passwordChanged = await usersController.updatePassword(request.body, request.params.id);
		return response.status(200).send(passwordChanged);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

export default users; 