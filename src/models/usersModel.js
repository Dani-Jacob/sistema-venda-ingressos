import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,  
    trim: true       
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
      type: Date,
      default: Date.now
    }
  }]

});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

export default UsuarioModel;
