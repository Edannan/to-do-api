import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { todoService } from "../services/todo.service";
import {
    createTodoSchema,
    updateTodoSchema,
    todoQuerySchema
} from "../validators/todo.validator";

export const todoController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const input = createTodoSchema.parse(req.body);

            const data: Prisma.TodoCreateInput = {
                ...input,
                dueDate: input.dueDate ? new Date(input.dueDate) : undefined
            };

            const todo = await todoService.create(data);

            res.status(201).json({ data: todo });
        } catch (error) {
            next(error);
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = todoQuerySchema.parse(req.query);

            const result = await todoService.findAll(filters);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (!Number.isSafeInteger(id) || id < 1) {
                return res.status(400).json({
                    error: "Invalid todo ID"
                });
            }

            const todo = await todoService.findById(id);

            if (!todo) {
                return res.status(404).json({
                    error: "Todo not found"
                });
            }

            res.status(200).json({ data: todo });
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (!Number.isSafeInteger(id) || id < 1) {
                return res.status(400).json({
                    error: "Invalid todo ID"
                });
            }

            const input = updateTodoSchema.parse(req.body);

            const data: Prisma.TodoUpdateInput = {
                ...input,
                dueDate: input.dueDate ? new Date(input.dueDate) : undefined
            };

            const existing = await todoService.findById(id);

            if (!existing) {
                return res.status(404).json({
                    error: "Todo not found"
                });
            }

            const todo = await todoService.update(id, data);

            res.status(200).json({ data: todo });
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (!Number.isSafeInteger(id) || id < 1) {
                return res.status(400).json({
                    error: "Invalid todo ID"
                });
            }

            const existing = await todoService.findById(id);

            if (!existing) {
                return res.status(404).json({
                    error: "Todo not found"
                });
            }

            await todoService.delete(id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};