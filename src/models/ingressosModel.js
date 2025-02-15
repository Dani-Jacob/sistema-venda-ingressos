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
  quantidade: {
    type: Number,
    required: true
  },

});

const IngressoModel = mongoose.model('ingressos', IngressoSchema);


async function createIngressoModel(evento, dataEvento, preco, tipo, assentos, quantidade) {
  const novoIngresso = new IngressoModel({
    evento,
    dataEvento,
    preco,
    tipo,
    assentos,
    quantidade
  });
  const rs = await novoIngresso.save();
  return rs;
}

async function getAllIngressosModel() {
  const ingressos = await IngressoModel.find();
  return ingressos;
}

async function getIngressoByIdModel(id) {
  const ingresso = await IngressoModel.findById(id);
  return ingresso;
}

async function updateIngressoModel(id, updates) {
  const ingresso = await IngressoModel.findByIdAndUpdate(id, updates, { new: true });
  return ingresso;
}

async function deleteIngressoModel(id) {
  const ingresso = await IngressoModel.findByIdAndDelete(id);
  return ingresso;
}



export {
  createIngressoModel,
  getAllIngressosModel,
  getIngressoByIdModel,
  updateIngressoModel,
  deleteIngressoModel
};
