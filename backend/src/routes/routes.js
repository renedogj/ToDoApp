import express from 'express';
import tasks from "../controllers/taskController.js";
import categories from "../controllers/categoryController.js";
import users from "../controllers/userController.js";

const router = express.Router();

router.get("/tasks", tasks.getTasks);
router.post("/tasks", tasks.createTask);
router.get("/categories", categories.getCategories);
router.post("/categories", categories.createCategory);
router.get("/users", users.getUsers);
router.post("/users", users.createUser);


export default router;