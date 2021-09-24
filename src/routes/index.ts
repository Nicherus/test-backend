import { Router } from 'express';
import usersRouter from './users';
import servicesRouter from './services';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/services', servicesRouter);

export default routes;