import { Request, Response, NextFunction } from 'express';

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
	console.error(err.stack);
	res.status(500).json({ message: err.message });
}
