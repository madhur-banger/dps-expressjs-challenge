import express from 'express';
import { authorization } from '../middleware/auth.middleware';
import { ReportController } from '../controllers/reports.controller';

const Router = express.Router();

Router.get('/reports', authorization, ReportController.getAllReports);
Router.post('/reports', authorization, ReportController.addReport);

Router.get('/report/:id', authorization, ReportController.getReportId);
Router.put('/report/:id', authorization, ReportController.updateReport);
Router.delete('/report/:id', authorization, ReportController.deleteReportById);
Router.get(
	'/reports/samewords/3',
	authorization,
	ReportController.getReportWith3SameWords,
);

export { Router as reportRouter };
