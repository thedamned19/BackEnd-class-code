import { loggerController } from '../controllers/loggerController.js';
import { middLogger } from '../loggger.js';
import { Router } from 'express';
export const router = Router();

router.get('/', middLogger, loggerController);