// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { projectSwaggerDocs } from './swagger/paths/projects.swagger';
import { reportSwaggerDocs } from './swagger/paths/reports.swagger';
import { schemas } from './swagger/components/schemas';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Projects & Reports API',
		version: '1.0.0',
		description: 'API for managing projects and their reports',
	},
	//   servers: [
	//     {
	//       url: '',
	//       description: 'Base API path'
	//     }
	//   ],
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
};

const options: swaggerJSDoc.Options = {
	swaggerDefinition,
	apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
