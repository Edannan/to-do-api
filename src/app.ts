import express from "express";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Todo API is running",
        version: "v1"
    });
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use("/api/v1/todos", todoRoutes);

app.use((_req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.use(errorHandler);

export default app;