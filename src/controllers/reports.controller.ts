import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import db from '../services/db.service';

interface Report {
	id: string;
	text: string;
	projectid: string;
}

export class ReportController {
	static async getAllReports(req: Request, res: Response) {
		const reports = db.query('SELECT * FROM reports');
		return res.status(200).json(reports);
	}
	static async getReportId(req: Request, res: Response) {
		const report = db.query(
			`SELECT * FROM reports WHERE id = '${req.params.id}`,
		);
		if (Object.keys(report).length === 0)
			return res
				.status(404)
				.send('The Report with given Id does not exist');
		return res.status(200).json(report);
	}
	static async deleteReportById(req: Request, res: Response) {
		const report = db.query(
			`SELECT * FROM reports WHERE id = '${req.params.id}`,
		);
		if (Object.keys(report).length === 0)
			return res
				.status(404)
				.send('The report with given Id does not exist');
		db.run(`DELETE FROM reports WHERE id = '${req.params.id}`);
		return res.status(200).json({
			message: 'Report deleted successfully',
			report,
		});
	}
	static async addReport(req: Request, res: Response) {
		const error = validateSchema(req);
		if (error) return res.status(400).send(error.details[0].message);
		if (!existProjectById(String(req.body.projectid)))
			return res.status(404).send('Invalid Project Id');
		const id = uuidv4();
		const text = req.body.text;
		const projectid = req.body.projectid;

		db.run(
			`INSERT INTO reports (id,text,projectid) VALUES (:id, :text, :projectid)`,
			{ id, text, projectid },
		);
		return res.status(200).json({
			message: 'User addedd Successfully',
			report: [{ id, text, projectid }],
		});
	}
	static async updateReport(req: Request, res: Response) {
		const error = validateSchema(req);
		if (error) return res.status(400).send(error.details[0].message);
		const report = db.query(
			`SELECT * FROM reports WHERE id = '${req.params.id}`,
		);
		if (Object.keys(report).length === 0)
			return res
				.status(404)
				.send('The report with the given ID is not found.');
		const id = req.params.id;
		const text = req.body.text;
		const projectid = req.body.projectid;

		db.run(
			`UPDATE reports SET text =:text, projectid =:projectid WHERE id =:id`,
			{ id, text, projectid },
		);
		return res.status(200).json({
			message: 'REport updated successfully',
			report: [{ id, text, projectid }],
		});
	}

	static async getReportWith3SameWords(req: Request, res: Response) {
		let reports = db.query('SELECT * FROM reports') as Report[];
		reports = reports.filter((_report) => {
			const wordCounts: Record<string, number> = {};

			const words = _report.text
				.toLowerCase()
				.replace(/[^\w\s]/g, '')
				.split(/\s+/);

			for (const word of words) {
				if (word) {
					wordCounts[word] = (wordCounts[word] || 0) + 1;
				}
			}
			return Object.values(wordCounts).some((count) => count >= 3);
		});
		return res.status(200).json(reports);
	}
}

function existProjectById(id: string) {
	const project = db.query(`SELECT * FROM projects WHERE id = ${id}`);
	if (Object.keys(project).length === 0) {
		return false;
	} else {
		return true;
	}
}

function validateSchema(req: Request) {
	const schema = Joi.object({
		text: Joi.string().required(),
		projectid: Joi.string().required(),
	});
	const { error } = schema.validate(req);
	return error;
}
