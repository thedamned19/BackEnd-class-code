import { Router } from 'express';
import usersController from '../controllers/usersController.js';
export const router = Router();

router.get('/',usersController.getUsers);
router.get('/:id',usersController.getUserById);
router.get('/email/:email',usersController.getUserByEmail);
router.post('/', usersController.createUser);