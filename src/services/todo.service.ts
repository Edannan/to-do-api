import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TodoFilters {
    completed?: "true" | "false";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    search?: string;
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "title" | "dueDate";
    order: "asc" | "desc";
}

export const todoService = {
    async create(data: Prisma.TodoCreateInput) {
        return prisma.todo.create({ data });
    },

    async findAll(filters: TodoFilters) {
        const where: Prisma.TodoWhereInput = {
            ...(filters.completed !== undefined && {
                completed: filters.completed === "true"
            }),

            ...(filters.priority && {
                priority: filters.priority
            }),

            ...(filters.search && {
                OR: [
                    {
                        title: {
                            contains: filters.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: filters.search,
                            mode: "insensitive"
                        }
                    }
                ]
            })
        };

        const [items, total] = await prisma.$transaction([
            prisma.todo.findMany({
                where,
                skip: (filters.page - 1) * filters.limit,
                take: filters.limit,
                orderBy: {
                    [filters.sortBy]: filters.order
                }
            }),

            prisma.todo.count({ where })
        ]);

        return {
            data: items,
            pagination: {
                page: filters.page,
                limit: filters.limit,
                total,
                totalPages: Math.ceil(total / filters.limit)
            }
        };
    },

    async findById(id: number) {
        return prisma.todo.findUnique({
            where: { id }
        });
    },

    async update(id: number, data: Prisma.TodoUpdateInput) {
        return prisma.todo.update({
            where: { id },
            data
        });
    },

    async delete(id: number) {
        return prisma.todo.delete({
            where: { id }
        });
    }
};