export const schemas = {
	Project: {
		type: 'object',
		properties: {
			name: {
				type: 'string',
				description: 'Name of the project',
			},
			description: {
				type: 'string',
				description: 'Detailed description of the project',
			},
		},
		required: ['name'],
	},
	Report: {
		type: 'object',
		properties: {
			text: {
				type: 'string',
				description: 'Unique identifier for the report',
			},
			project_id: {
				type: 'string',
				description: 'ID of the associated project',
			},
		},
		required: ['project_id', 'text'],
	},
};
