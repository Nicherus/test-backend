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
import contactsController from '../controllers/contactsController';
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
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

users.post('/contacts/:id', verifyJWT, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.createContact(request.body, request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

users.put('/contacts/:id', verifyJWT, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.editContact(request.body, request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

users.get('/contacts', verifyJWT, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.getAllContacts(request.body, request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

users.get('/contacts/:id', verifyJWT, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.getContactById(request.body, request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

users.delete('/contacts/:id', verifyJWT, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contactDeleted = await contactsController.deleteContact(request.body, request.params.id);
		return response.status(200).send(contactDeleted);
	} catch(error){
		console.log(error, "zap");
		
		return response.status(error.code).send(error.message);
	}
});

export default users; 