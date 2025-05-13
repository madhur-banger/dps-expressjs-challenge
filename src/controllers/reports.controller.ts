import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../services/db.service';
import { validateReportSchema } from '../utils/validateSchema';

//Report Controllers
export class ReportController {
	static async getAllReports(
		_req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const reports = await db.query('SELECT * FROM reports');
			return res.status(200).json(reports);
		} catch (err) {
			next(err);
		}
	}

	static async getReportById(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { id } = req.params;
			const report = await db.query(
				'SELECT * FROM reports WHERE id = :id',
				{
					id,
				},
			);
			if (Object.keys(report).length === 0)
				return res.status(404).json({ message: 'Report not found' });
			return res.status(200).json(report);
		} catch (err) {
			next(err);
		}
	}

	static async deleteReportById(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { id } = req.params;
			const report = await db.query(
				'SELECT * FROM reports WHERE id = :id',
				{
					id,
				},
			);
			if (Object.keys(report).length === 0)
				return res.status(404).json({ message: 'Report not found' });

			await db.run('DELETE FROM reports WHERE id = :id', { id });
			return res
				.status(200)
				.json({ message: 'Report deleted successfully', report });
		} catch (err) {
			next(err);
		}
	}

	static async addReport(req: Request, res: Response, next: NextFunction) {
		try {
			const { error } = validateReportSchema(req);
			if (error)
				return res
					.status(400)
					.json({ message: error.details[0].message });

			const { project_id, text } = req.body;
			const exists = await db.query(
				'SELECT * FROM projects WHERE id = :id',
				{
					id: project_id,
				},
			);
			if (Object.keys(exists).length === 0)
				return res.status(404).json({ message: 'Invalid project ID' });

			const id = uuidv4();
			await db.run(
				'INSERT INTO reports (id, text, projectid) VALUES (:id, :text, :project_id)',
				{
					id,
					text,
					project_id,
				},
			);

			return res.status(201).json({
				message: 'Report added successfully',
				report: { id, text, project_id },
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateReport(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { error } = validateReportSchema(req);
			if (error)
				return res
					.status(400)
					.json({ message: error.details[0].message });

			const existing = await db.query(
				'SELECT * FROM reports WHERE id = :id',
				{
					id,
				},
			);
			if (Object.keys(existing).length === 0)
				return res.status(404).json({ message: 'Report not found' });

			const { text, project_id } = req.body;
			await db.run(
				'UPDATE reports SET text = :text, projectid = :project_id WHERE id = :id',
				{
					id,
					text,
					project_id,
				},
			);

			return res.status(200).json({
				message: 'Report updated successfully',
				report: { id, text, project_id },
			});
		} catch (err) {
			next(err);
		}
	}

	static async getReportWith3SameWords(
		_req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			let reports = (await db.query('SELECT * FROM reports')) as {
				id: string;
				text: string;
				projectid: string;
			}[];

			reports = reports.filter((report) => {
				const wordCounts: Record<string, number> = {};
				const words = report.text
					.toLowerCase()
					.replace(/[^\w\s]/g, '')
					.split(/\s+/);

				for (const word of words) {
					if (word) wordCounts[word] = (wordCounts[word] || 0) + 1;
				}

				return Object.values(wordCounts).some((count) => count >= 3);
			});

			return res.status(200).json(reports);
		} catch (err) {
			next(err);
		}
	}
}
