import express from 'express';
import { authorization } from '../middleware/auth.middleware';

const Router = express.Router();

Router.get('/reports', authorization);
Router.post('/reports', authorization);

Router.get('/report/:id', authorization);
Router.put('/report/:id', authorization);
Router.delete('/report/:id', authorization);

export { Router as reportRouter };
