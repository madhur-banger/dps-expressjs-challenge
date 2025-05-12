import { Request, Response, NextFunction } from 'express';
import db from '../services/db.service';
import { v4 as uuidv4 } from 'uuid';
import { validateProjectSchema } from '../utils/validateSchema';

export class ProjectController {
	static async getAllProjects(
		_req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const projects = db.query('SELECT * FROM projects');
			return res.status(200).json(projects);
		} catch (err) {
			next(err);
		}
	}

	static async getProjectById(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { id } = req.params;
			const project = db.query('SELECT * FROM projects WHERE id = :id', {
				id,
			});
			if (Object.keys(project).length === 0)
				return res.status(404).json({ message: 'Project not found' });
			return res.status(200).json(project);
		} catch (err) {
			next(err);
		}
	}

	static async deleteProjectById(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { id } = req.params;
			const project = db.query('SELECT * FROM projects WHERE id = :id', {
				id,
			});
			if (Object.keys(project).length === 0)
				return res.status(404).json({ message: 'Project not found' });

			db.run('DELETE FROM projects WHERE id = :id', { id });
			return res
				.status(200)
				.json({ message: 'Project deleted successfully', project });
		} catch (err) {
			next(err);
		}
	}

	static async addProject(req: Request, res: Response, next: NextFunction) {
		try {
			const { error } = validateProjectSchema(req);
			if (error)
				return res
					.status(400)
					.json({ message: error.details[0].message });

			const id = uuidv4();
			const { name, description } = req.body;
			db.run(
				'INSERT INTO projects (id, name, description) VALUES (:id, :name, :description)',
				{ id, name, description },
			);
			return res.status(201).json({
				message: 'Project added successfully',
				project: { id, name, description },
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateProject(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { id } = req.params;
			const { error } = validateProjectSchema(req);
			if (error)
				return res
					.status(400)
					.json({ message: error.details[0].message });

			const existing = db.query('SELECT * FROM projects WHERE id = :id', {
				id,
			});
			if (Object.keys(existing).length === 0)
				return res.status(404).json({ message: 'Project not found' });

			const { name, description } = req.body;
			db.run(
				'UPDATE projects SET name = :name, description = :description WHERE id = :id',
				{
					id,
					name,
					description,
				},
			);

			return res.status(200).json({
				message: 'Project updated successfully',
				project: { id, name, description },
			});
		} catch (err) {
			next(err);
		}
	}
}
