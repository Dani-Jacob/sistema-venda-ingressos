import {createUsuarioModel,getUsuarioByCpfModel,getUsuarioByEmailModel} from '../models/usuariosModels.js';
import CustomError from '../customErros/CustomError.js';

async function createUsuarioController(req,res,next) {
    const {nome, cpf, email, senha} = req.body;

    try{
        if((await getUsuarioByCpfModel(cpf))){
            return next(new CustomError(400, 'CPF já cadastrado'));
        }
        if((await getUsuarioByEmailModel(email))){
            return next(new CustomError(400, 'E-mail já cadastrado'));            
        }
        const usuarioCriado = await createUsuarioModel(nome, 'usuario', cpf, email, senha, []);
        return res.status(201).json(usuarioCriado);
    }catch(error){
        return next(error);
    }

} 

export {
    createUsuarioController
};
