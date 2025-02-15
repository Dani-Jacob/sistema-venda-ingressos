import userModel from '../models/usersModel.js';

async function login(req, res, next) {
    const { email, password } = req.body;

    const user = getUserByEmail(email);
    
    if(!user){
        if(user.senha == password){
            const token = "" ;
    
            if(token == null){
                
            }
            res.status(200).json({ token });
        }
    }
    next(new CustomError(403, 'Permissão negada!'));
}

function getUserByEmail(email){
    userModel.findOne({ email: email }).then(user => {
        if (user) {
        return user;
        } else {
        return null;
        }
  })
  .catch(err => {
    console.error('Erro ao buscar o usuário:', err);
  });
}

export default login;