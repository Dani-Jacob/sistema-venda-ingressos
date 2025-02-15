import express from 'express';

import {
    createIngressoController,
    getAllIngressosControler,
    getIngressoByIdControler,
    updateIngressoControler,
    deleteIngressoControler,
    comprarIngressoControler
} from '../controllers/IngressosController.js';

import {
    authenticateToken,
    isAdmin
} from '../middlewares/AuthenticationMiddleware.js';

const router = express.Router();

//Create
router.post('/',authenticateToken, isAdmin, createIngressoController);

//Read
router.get('/',authenticateToken, getAllIngressosControler);
router.get('/:id',authenticateToken, getIngressoByIdControler);

//Compra ingresso
router.post('/:id/comprar', authenticateToken, comprarIngressoControler);

//Update
router.put('/:id',authenticateToken, isAdmin, updateIngressoControler);

//Delete
router.delete('/:id',authenticateToken, isAdmin, deleteIngressoControler);



export default router;
