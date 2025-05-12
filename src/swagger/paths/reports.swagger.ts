// src/swagger/paths/reports.swagger.ts
export const reportSwaggerDocs = {
	'/api/v1/reports': {
		get: {
			summary: 'Get all reports',
			description: 'Retrieve a list of all reports',
			security: [{ bearerAuth: [] }],
			parameters: [],
			responses: {
				'200': {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/components/schemas/Report',
								},
							},
						},
					},
				},
			},
		},
		post: {
			summary: 'Create a new report',
			description: 'Add a new report to the system',
			security: [{ bearerAuth: [] }],
			parameters: [],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Report',
						},
					},
				},
			},
			responses: {
				'201': {
					description: 'Report created successfully',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Report',
							},
						},
					},
				},
			},
		},
	},
	'/api/v1/reports/{id}': {
		get: {
			summary: 'Get a report by ID',
			description:
				'Retrieve a specific report using its unique identifier',
			security: [{ bearerAuth: [] }],
			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the report',
				},
			],
			responses: {
				'200': {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Report',
							},
						},
					},
				},
			},
		},
		put: {
			summary: 'Update a report',
			description: 'Update an existing report',
			security: [{ bearerAuth: [] }],
			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the report to update',
				},
			],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Report',
						},
					},
				},
			},
			responses: {
				'200': {
					description: 'Report updated successfully',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Report',
							},
						},
					},
				},
			},
		},
		delete: {
			summary: 'Delete a report',
			description: 'Remove a report from the system',
			security: [{ bearerAuth: [] }],
			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the report to delete',
				},
			],
			responses: {
				'204': {
					description: 'Report deleted successfully',
				},
			},
		},
	},
	'/api/v1/reports/samewords/3': {
		get: {
			summary: 'Get reports with 3 same words',
			description: 'Retrieve reports that have 3 same words',
			security: [{ bearerAuth: [] }],
			responses: {
				'200': {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/components/schemas/Report',
								},
							},
						},
					},
				},
			},
		},
	},
};
