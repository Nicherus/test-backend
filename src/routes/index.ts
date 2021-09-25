import { Router } from 'express';
import usersRouter from './users';
import servicesRouter from './services';
import contactsRouter from './contacts';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/services', servicesRouter);
routes.use('/contacts', contactsRouter);

export default routes;