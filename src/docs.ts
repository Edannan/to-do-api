const swaggerDocument = {
    openapi: "3.0.3",

    info: {
        title: "Todo API",
        version: "1.0.0",
        description:
            "REST API for creating, retrieving, updating, deleting, and filtering to-do items."
    },

    servers: [
        {
            url: "/",
            description: "Current server"
        }
    ],

    tags: [
        {
            name: "Todos",
            description: "Todo management endpoints"
        }
    ],

    paths: {
        "/api/v1/todos": {
            post: {
                tags: ["Todos"],
                summary: "Create a todo",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["title"],
                                properties: {
                                    title: {
                                        type: "string",
                                        maxLength: 150,
                                        example: "Complete today's task"
                                    },
                                    description: {
                                        type: "string",
                                        example: "Finish the project"
                                    },
                                    completed: {
                                        type: "boolean",
                                        default: false
                                    },
                                    priority: {
                                        type: "string",
                                        enum: ["LOW", "MEDIUM", "HIGH"],
                                        default: "MEDIUM"
                                    },
                                    dueDate: {
                                        type: "string",
                                        format: "date-time",
                                        example: "2026-11-01T12:00:00.000Z"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Todo created successfully"
                    },
                    "400": {
                        description: "Invalid request data"
                    }
                }
            },

            get: {
                tags: ["Todos"],
                summary: "Get todos with filtering and pagination",
                parameters: [
                    {
                        name: "completed",
                        in: "query",
                        schema: {
                            type: "boolean"
                        },
                        description: "Filter by completion status"
                    },
                    {
                        name: "priority",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["LOW", "MEDIUM", "HIGH"]
                        },
                        description: "Filter by priority"
                    },
                    {
                        name: "search",
                        in: "query",
                        schema: {
                            type: "string"
                        },
                        description: "Search titles and descriptions"
                    },
                    {
                        name: "page",
                        in: "query",
                        schema: {
                            type: "integer",
                            minimum: 1,
                            default: 1
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: {
                            type: "integer",
                            minimum: 1,
                            maximum: 100,
                            default: 10
                        }
                    },
                    {
                        name: "sortBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["createdAt", "updatedAt", "title", "dueDate"],
                            default: "createdAt"
                        }
                    },
                    {
                        name: "order",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["asc", "desc"],
                            default: "desc"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "List of todos returned successfully"
                    },
                    "400": {
                        description: "Invalid query parameters"
                    }
                }
            }
        },

        "/api/v1/todos/{id}": {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        minimum: 1
                    },
                    description: "Todo ID"
                }
            ],

            get: {
                tags: ["Todos"],
                summary: "Get a todo by ID",
                responses: {
                    "200": {
                        description: "Todo returned successfully"
                    },
                    "400": {
                        description: "Invalid todo ID"
                    },
                    "404": {
                        description: "Todo not found"
                    }
                }
            },

            patch: {
                tags: ["Todos"],
                summary: "Update a todo",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: {
                                        type: "string",
                                        maxLength: 150
                                    },
                                    description: {
                                        type: "string"
                                    },
                                    completed: {
                                        type: "boolean"
                                    },
                                    priority: {
                                        type: "string",
                                        enum: ["LOW", "MEDIUM", "HIGH"]
                                    },
                                    dueDate: {
                                        type: "string",
                                        format: "date-time"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Todo updated successfully"
                    },
                    "400": {
                        description: "Invalid request data"
                    },
                    "404": {
                        description: "Todo not found"
                    }
                }
            },

            delete: {
                tags: ["Todos"],
                summary: "Delete a todo",
                responses: {
                    "204": {
                        description: "Todo deleted successfully"
                    },
                    "400": {
                        description: "Invalid todo ID"
                    },
                    "404": {
                        description: "Todo not found"
                    }
                }
            }
        }

    }
};

export default swaggerDocument;