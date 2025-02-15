import express from 'express';

import {
    createUsuarioController,
} from '../controllers/UsuarioController.js';

import {
    authenticateToken,
    isAdmin
} from '../middlewares/AuthenticationMiddleware.js';

const router = express.Router();

//Create
router.post('/',authenticateToken, createUsuarioController);


export default router;
