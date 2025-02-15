import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,  
    trim: true       
  },
  permissao: {
    type: String,
    required: true,    
  },
  cpf: {
    type: String,
    required: true,  
    unique: true, 
  },
  email: {
    type: String,
    required: true,  
    unique: true,    
    lowercase: true, 
    trim: true
  },
  senha: {
    type: String,
    required: true,  
    minlength: 6     
  },
  ingressos: [{
    evento: {
      type: String,
      required: true 
    },
    dataEvento: {
      type: String,
      required: true 
    },
    preco: {
      type: Number,
      required: true 
    },
    tipo: {
      type: String,
      required: true
    },
    assento: {
      type: String,
      required: true 
    },
    compradoEm: {
      type: String
    }
  }]

});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

async function getUsuarioByEmailModel(email) {
  const user = await UsuarioModel.findOne({ email: email });  
  return user;  
}

async function getUsuarioByCpfModel(cpf) {
  const user = await UsuarioModel.findOne({ cpf: cpf }); 
  return user;  
}
async function getUsuarioByIdModel(id) {
  const user = await UsuarioModel.findById(id); 
  return user;    
}

async function createUsuarioModel(nome, permissao, cpf, email, senha, ingressos) {
  const novoUsuario = new UsuarioModel({
    nome: nome,
    permissao: permissao,
    cpf: cpf,
    email: email,
    senha: senha,
    ingressos: ingressos
  });
  const usuarioSalvo = await novoUsuario.save();
  return usuarioSalvo;
}

async function updateUsuarioModel(id,update) {
  const usuario = await UsuarioModel.findByIdAndUpdate(id, update, { new: true });
  return usuario;
}


export {
  getUsuarioByEmailModel,
  createUsuarioModel,
  getUsuarioByCpfModel,
  updateUsuarioModel,
  getUsuarioByIdModel
};
