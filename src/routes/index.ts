import { Router } from 'express';
import usersRouter from './users';

const routes = Router();

routes.use('/user', usersRouter);

export default routes;