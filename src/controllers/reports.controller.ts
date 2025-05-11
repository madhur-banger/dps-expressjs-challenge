import { Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';
// import Joi from 'joi';
import db from '../services/db.service';

// interface Report {
// 	id: string;
// 	text: string;
// 	projectid: string;
// }

export class ReportController {
	static async getAllReports(req: Request, res: Response) {
		const projects = db.query('SELECT * FROM reports');
		return res.status(200).json(projects);
	}
	static async getReportId(req: Request, res: Response) {
		const project = db.query(
			`SELECT * FROM reports WHERE id = '${req.params.id}`,
		);
		if (Object.keys(project).length === 0)
			return res
				.status(404)
				.send('The Report with given Id does not exist');
	}
}

// function existProjectById(id: string) {
// 	const project = db.query(`SELECT * FROM projects WHERE id = ${id}`);
// 	if (Object.keys(project).length === 0) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

// function validateSchema(req: Request) {
// 	const schema = Joi.object({
// 		text: Joi.string().required(),
// 		projectid: Joi.string().required(),
// 	});
// 	const { error } = schema.validate(req);
// 	return error;
// }
