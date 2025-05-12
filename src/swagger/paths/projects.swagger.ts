export const projectSwaggerDocs = {
	'/api/v1/projects': {
		get: {
			tags: ['Projects'],
			summary: 'Get all projects',
			description: 'Retrieve a list of all projects',
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
									$ref: '#/components/schemas/Project',
								},
							},
						},
					},
				},
			},
		},
		post: {
			tags: ['Projects'],
			summary: 'Create a new project',
			description: 'Add a new project to the system',
			security: [{ bearerAuth: [] }],
			parameters: [],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Project',
						},
					},
				},
			},
			responses: {
				'201': {
					description: 'Project created successfully',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Project',
							},
						},
					},
				},
			},
		},
	},
	'/api/v1/projects/{id}': {
		get: {
			tags: ['Projects'],
			summary: 'Get a project by ID',
			description:
				'Retrieve a specific project using its unique identifier',
			security: [{ bearerAuth: [] }],
			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the project',
				},
			],
			responses: {
				'200': {
					description: 'Successful response',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Project',
							},
						},
					},
				},
			},
		},
		put: {
			tags: ['Projects'],
			summary: 'Update a project',
			description: 'Update an existing project',
			security: [{ bearerAuth: [] }],
			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the project to update',
				},
			],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Project',
						},
					},
				},
			},
			responses: {
				'200': {
					description: 'Project updated successfully',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Project',
							},
						},
					},
				},
			},
		},
		delete: {
			tags: ['Projects'],
			summary: 'Delete a project',
			description: 'Remove a project from the system',
			security: [{ bearerAuth: [] }],

			parameters: [
				{
					in: 'path',
					name: 'id',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Unique identifier of the project to delete',
				},
			],
			responses: {
				'204': {
					description: 'Project deleted successfully',
				},
			},
		},
	},
};
