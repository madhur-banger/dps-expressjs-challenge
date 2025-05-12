import express from 'express';
import { authorization } from '../middleware/auth.middleware';
import { ProjectController } from '../controllers/projects.controller';

const router = express.Router();

router.get('/', authorization, ProjectController.getAllProjects);
router.post('/', authorization, ProjectController.addProject);
router.get('/:id', authorization, ProjectController.getProjectById);
router.put('/:id', authorization, ProjectController.updateProject);
router.delete('/:id', authorization, ProjectController.deleteProjectById);

export { router as projectRouter };
