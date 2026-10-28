import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            error: "Validation failed",
            details: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }

    if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
    ) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    console.error(error);

    return res.status(500).json({
        error: "Internal server error"
    });
}