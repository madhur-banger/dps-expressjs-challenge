import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import db from '../services/db.service';

export class ProjectController {
	static async getAllProjects(req: Request, res: Response) {
		const projects = db.query('SELECT * FROM projects');
		return res.status(200).json(projects);
	}
	static async getProjectById(req: Request, res: Response) {
		const project = db.query(
			`SELECT * FROM projects WHERE id = '${req.params.id}'`,
		);
		if (Object.keys(project).length === 0)
			return res
				.status(404)
				.send('The project with the given ID is not found');
		return res.status(200).json(project);
	}
	static async deleteProjectById(req: Request, res: Response) {
		const project = db.query(
			`SELECT * FROM projects WHERE id = '${req.params.id}'`,
		);
		if (Object.keys(project).length === 0)
			return res
				.status(404)
				.send('The Project with Given Id does not exist');
		db.run(`DELETE FROM projects WHERE id = '${req.params.id}'`);
		return res
			.status(200)
			.json({ message: 'Projects deleted successfully', project });
	}
	static async addProject(req: Request, res: Response) {
		const error = validateSchema(req);
		if (error) return res.status(400).send(error.details[0].message);
		const id = uuidv4();
		const name = req.body.name;
		const description = req.body.description;
		db.run(
			'INSERT INTO projects (id,name,description) VALUES (:id,:name,:description)',
			{ id, name, description },
		);
		return res.status(200).json({
			message: 'Project added successfully',
			project: [{ id, name, description }],
		});
	}

	static async updateProject(req: Request, res: Response) {
		const error = validateSchema(req);
		if (error) return res.status(400).send(error.details[0].message);
		const project = db.query(
			`SELECT * FROM projects WHERE id = '${req.params.id}`,
		);
		if (Object.keys(project).length === 0)
			return res
				.status(404)
				.send('The Project with Given Id does not exist ');

		const id = req.params.id;
		const name = req.body.name;
		const description = req.body.description;
		db.run(
			`UPDATE projects SET name = :name, description =:description WHERE id = '${req.params.id}`,
		);
		return res.status(200).json({
			message: 'Project has been Updated Successfully',
			project: [{ id, name, description }],
		});
	}
}

function validateSchema(req: Request) {
	const schema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	return error;
}
