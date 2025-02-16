import jwt from 'jsonwebtoken';
import CustomError from '../customErros/CustomError.js';
import dotenv from 'dotenv';
dotenv.config();


const authenticateToken = (req, res, next) => {
    /*const authHeader = req.headers['authorization'];
    if(!authHeader){
        return next(new CustomError(401, 'Credenciais inválidas!'));
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;*/
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).redirect('/paginas/login');
        //return next(new CustomError(401, 'Acesso negado!'));
    }
    jwt.verify(token, process.env.JWT_SECRET || 'PalavraSecretaShow', (err, user) => {
        if(err){
            return res.status(401).redirect('/paginas/login');
            //return next(new CustomError(401, 'Credenciais inválidas!'));
        }
        req.user = user;
        next();
    })
}




const isAdmin = (req, res, next) => {
    if (req.user.permissao != 'admin') {
            return next(new CustomError(403, 'Acesso negado! Você não é admin!'));
        }
    next();
};

export {
    authenticateToken,
    isAdmin
}
