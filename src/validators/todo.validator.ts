import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().trim().min(1).max(150),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().datetime().optional()
});

export const updateTodoSchema = createTodoSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required"
    });

export const todoQuerySchema = z.object({
    completed: z.enum(["true", "false"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    search: z.string().trim().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z.enum(["createdAt", "updatedAt", "title", "dueDate"])
        .default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc")
});