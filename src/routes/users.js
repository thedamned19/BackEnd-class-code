import { Router } from 'express';
//import usersController from '../controllers/usersController.js';
import { getUsers, getUserById, getUserByEmail, createUser } from "../controllers/usersController.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.post('/', createUser);

export default router;


