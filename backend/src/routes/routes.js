import express from 'express';
import tasks from "../controllers/taskController.js";
import labels from "../controllers/labelController.js";
import users from "../controllers/userController.js";

const router = express.Router();

router.get("/tasks", tasks.getTasks);
router.post("/tasks", tasks.createTask);
router.get("/labels", labels.getLabels);
router.post("/labels", labels.createLabel);
router.get("/users", users.getUsers);
router.post("/users", users.createUser);


export default router;