import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { projectRouter } from './routes/projects.routes';
import { reportRouter } from './routes/reports.routes';
import { errorHandler } from './middleware/error.middleware';
import { swaggerUi, swaggerSpec } from '../src/swagger';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to My Backend Assignment :)');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/reports', reportRouter);

app.use('*', (_req, res) => {
	res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
