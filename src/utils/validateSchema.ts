import Joi from 'joi';
import { Request } from 'express';

export function validateProjectSchema(req: Request) {
	const schema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
	});

	return schema.validate(req.body);
}

export function validateReportSchema(req: Request) {
	const schema = Joi.object({
		text: Joi.string().required(),
		project_id: Joi.string().required(),
	});

	return schema.validate(req.body);
}
