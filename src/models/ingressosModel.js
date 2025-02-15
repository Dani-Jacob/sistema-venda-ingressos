import mongoose from 'mongoose';

const IngressoSchema = new mongoose.Schema({
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
    },
    quantidade: {
        type: Number,
        required: true 
    },

});

const IngressoModel = mongoose.model('ingressos', IngressoSchema);

export default UsuarioModel;
