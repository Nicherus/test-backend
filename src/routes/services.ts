import { Request, Response, Router } from 'express';
import servicesController from '../controllers/servicesController';
import { bracketsTestMiddleware } from '../middlewares/servicesMiddlewares';

const services = Router();

services.post('/brackets', bracketsTestMiddleware, async (request: Request, response: Response): Promise<Response> => {
	try{
		const bracketsTest = await servicesController.bracketsTesting(request.body.inputBrackets);
		return response.status(200).send(bracketsTest);
	} catch(error){
		return response.status(error.code).send(error.message);
	}
});

export default services;