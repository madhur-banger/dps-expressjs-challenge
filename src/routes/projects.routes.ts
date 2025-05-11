import express from 'express';
import { authorization } from '../middleware/auth.middleware';
import { ProjectController } from '../controllers/projects.controller';

const Router = express.Router();

Router.get('/projects', authorization, ProjectController.getAllProjects);
Router.post('/projects', authorization, ProjectController.addProject);
Router.get('/project/:id', authorization, ProjectController.getProjectById);
Router.put('/project/:id', authorization, ProjectController.updateProject);
Router.delete(
	'/project/;id',
	authorization,
	ProjectController.deleteProjectById,
);

export { Router as projectRouter };
