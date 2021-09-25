import { Request, Response, Router } from 'express';

import { checkIdMiddleware, createContactMiddleware, updateContactMiddleware } from '../middlewares/contactsMiddlewares';

import contactsController from '../controllers/contactsController';
import { verifyJWT } from '../middlewares/authMiddleware';

const contacts = Router();

contacts.post('/:id', verifyJWT, createContactMiddleware,async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.createContact(request.body, request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

contacts.put('/:id', verifyJWT, checkIdMiddleware, updateContactMiddleware, async (request: any, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.editContact(request.body, request.params.id, request.userId);
		return response.status(200).send(contact);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

contacts.get('/:id', verifyJWT, checkIdMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.getAllContacts(request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

contacts.get('/data/:id', verifyJWT, checkIdMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contact = await contactsController.getContactById(request.params.id);
		return response.status(200).send(contact);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

contacts.delete('/:id', verifyJWT, checkIdMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const contactDeleted = await contactsController.deleteContact(request.params.id);
		return response.status(200).send(contactDeleted);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

export default contacts; 