import express, { Express } from 'express';
import dotenv from 'dotenv';
import { projectRouter } from './routes/projects.routes';
import { reportRouter } from './routes/reports.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Welcome to my Backend Project');
});

app.use('/api', projectRouter);
app.use('/api', reportRouter);

app.get('*', (req, res) => {
	res.status(505).json({ messgae: 'Request denied' });
});
