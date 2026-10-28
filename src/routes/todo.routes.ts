import { Router } from "express";
import { todoController } from "../controllers/todo.controller";

const router = Router();

router.post("/", todoController.create);
router.get("/", todoController.findAll);

router.get("/:id", todoController.findById);
router.patch("/:id", todoController.update);
router.delete("/:id", todoController.delete);

export default router;