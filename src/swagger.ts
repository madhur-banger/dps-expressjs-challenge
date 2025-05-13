// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { projectSwaggerDocs } from './swagger/paths/projects.swagger';
import { reportSwaggerDocs } from './swagger/paths/reports.swagger';
import { schemas } from './swagger/components/schemas';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DPS Backend Application',
		version: '1.0.0',
		description: 'API documentation for DPS-expressjs-challenge ',
		contact: {
			name: 'Madhur',
			url: 'https://www.linkedin.com/in/madhur-%E2%98%81%EF%B8%8F-5539612a9/',
		},
	},

	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				description: 'Hint: Use "Password123" for testing',
			},
		},
		schemas: schemas,
	},
	paths: {
		...projectSwaggerDocs,
		...reportSwaggerDocs,
	},
	security: [
		{
			bearerAuth: [],
		},
	],
	tags: [
		{ name: 'Projects', description: 'Operations related to projects' },
		{ name: 'Reports', description: 'Operations related to reports' },
	],
};

const options: swaggerJSDoc.Options = {
	swaggerDefinition,
	apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
