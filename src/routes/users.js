import { Router } from 'express';
//import usersController from '../controllers/usersController.js';
import { getUsers, getUserById, getUserByEmail, createUser, changeUser } from "../controllers/usersController.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.post('/', createUser);
router.post('/premium/:uid', changeUser);

export default router;


