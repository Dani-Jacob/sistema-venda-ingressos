import {getUsuarioByEmailModel} from '../models/usuariosModels.js';
import CustomError from '../customErros/CustomError.js';
import jwt from 'jsonwebtoken';


async function login(req, res, next) {
    const { email, password } = req.body;

    const user = await getUsuarioByEmailModel(email);

    if(user){
        if(user.senha == password){
            const token = await generateToken(user);
            
            if(token){
                res.cookie('token', token, {
                    maxAge: (1800 * 1000),
                    httpOnly: true
                });
                return res.status(200).redirect('/paginas/home');
                //return res.status(200).json({ token });
                
            }
        }
    }
    res.status(403).render('login',{errorMessage: "Permissão negada!"});
}


async function generateToken(user){
    const payload = {
        id: user.id,
        email: user.email,
        permissao: user.permissao,
        nome: user.nome
    };
    let secret = process.env.JWT_SECRET || 'PalavraSecretaShow';
    let time = process.env.JWT_TIME || '1800s';
    return jwt.sign(payload, secret, { expiresIn: time });
};

export default login;