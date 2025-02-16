import {createUsuarioModel,getUsuarioByCpfModel,getUsuarioByEmailModel, getUsuarioByIdModel} from '../models/usuariosModels.js';
import { verificarIdMongoose, getFormattedDate } from '../utils/utils.js';


async function createUsuarioController(req,res,next) {
    const {nome, cpf, email, senha} = req.body;
    console.log("estaAqui");
    try{
        if((await getUsuarioByCpfModel(cpf))){
            res.status(400).render('cadastro',{errorMessage: "CPF já cadastrado!"});
        }
        if((await getUsuarioByEmailModel(email))){ 
            res.status(400).render('cadastro',{errorMessage: 'E-mail já cadastrado!'});         
        }
        const usuarioCriado = await createUsuarioModel(nome, 'usuario', cpf, email, senha, []);
        res.status(201).redirect('/paginas/login');
        //return res.status(201).json(usuarioCriado);
    }catch(error){
        return res.status(500).render('cadastro',{errorMessage: error});
    }

} 


export {
    createUsuarioController,
};
