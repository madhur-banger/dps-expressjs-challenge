import { NextFunction, Request, Response } from 'express';

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'Password123';

export const authorization = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization;

	if (token === `Bearer ${AUTH_TOKEN}`) return next();

	return res.status(401).json({
		message: 'Unauthorized: Invalid or missing authorization token',
	});
};
