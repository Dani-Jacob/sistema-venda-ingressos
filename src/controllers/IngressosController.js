import CustomError from '../customErros/CustomError.js';
import {
    createIngressoModel,
    getAllIngressosModel,
    getIngressoByIdModel,
    updateIngressoModel,
    deleteIngressoModel
} from '../models/ingressosModel.js';

import {
    updateUsuarioModel,
} from '../models/usuariosModels.js';

import { verificarIdMongoose, getFormattedDate } from '../utils/utils.js';



async function createIngressoController(req,res,next) {
    const {evento, dataEvento, preco, tipo, assentos, quantidade} = req.body;
    try{
        const result = await createIngressoModel(evento, dataEvento, preco, tipo, assentos, quantidade)
        return res.status(201).json(result);
    }catch(error){
        return next(error);
    }
} 

async function getAllIngressosControler(req,res,next) {
    try{
        const result = await getAllIngressosModel();
        return res.status(201).json(result);
    }catch(error){
        return next(error);
    }
}

async function getIngressoByIdControler(req,res,next) {
    const {id} = req.params
    verificarIdMongoose(id,next);
    try{
        const result = await getIngressoByIdModel(id);
        return res.status(201).json(result);
    }catch(error){
        return next(error);
    }
}

async function updateIngressoControler(req,res,next) {
    const {id} = req.params
    verificarIdMongoose(id,next);
    try{
        const result = await updateIngressoModel(id, req.body);
        return res.status(201).json(result);
    }catch(error){
        return next(error);
    }
}

async function deleteIngressoControler(req,res,next) {
    const {id} = req.params
    verificarIdMongoose(id,next);
    try{
        const result = await deleteIngressoModel(id,req.body);
        return res.sendStatus(204);
    }catch(error){
        return next(error);
    }
}



async function comprarIngressoControler(req, res, next) {
    const { id } = req.params;
    verificarIdMongoose(id,next);
    const id_usuario = req.user.id;
    try {
        const ingresso = await getIngressoByIdModel(id);
        console.log(ingresso);
        if (!ingresso) {
            next(new CustomError(404, 'Ingresso não encontrado'));
        }
        if (ingresso.quantidade <= 0) {
            next(new CustomError(409, 'Ingressos esgotados'));
        }
        ingresso.quantidade = (ingresso.quantidade - 1);
        await ingresso.save();

        const novoIngresso = {
            evento: ingresso.evento,
            dataEvento: ingresso.dataEvento,
            preco: ingresso.preco,
            tipo: ingresso.tipo,
            compradoEm: getFormattedDate()
        };
        const usuario = await updateUsuarioModel(id_usuario, { $push: { ingressos: novoIngresso } });
        return res.status(201).json({usuario});
    } catch (error) {
        return next(error);
    }
}





export {
    createIngressoController,
    getAllIngressosControler,
    getIngressoByIdControler,
    updateIngressoControler,
    deleteIngressoControler,
    comprarIngressoControler
};
