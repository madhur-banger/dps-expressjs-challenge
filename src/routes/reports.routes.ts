import express from 'express';
import { authorization } from '../middleware/auth.middleware';
import { ReportController } from '../controllers/reports.controller';

const router = express.Router();

//Report Router with auth
router.get('/', authorization, ReportController.getAllReports);
router.post('/', authorization, ReportController.addReport);
router.get('/:id', authorization, ReportController.getReportById);
router.put('/:id', authorization, ReportController.updateReport);
router.delete('/:id', authorization, ReportController.deleteReportById);
router.get(
	'/samewords/3',
	authorization,
	ReportController.getReportWith3SameWords,
);

export { router as reportRouter };
