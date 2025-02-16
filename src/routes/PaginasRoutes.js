import express from 'express';
import { getAllIngressosModel } from '../models/ingressosModel.js';
import {
    authenticateToken,
} from '../middlewares/AuthenticationMiddleware.js';

import { getUsuarioByIdModel } from '../models/usuariosModels.js';

import { getAllIngressosDisponiveisModel } from '../models/ingressosModel.js';


const router = express.Router();


router.get('/login', (req, res)=>{
    res.render('login' );
})

router.get('/cadastro', (req, res)=>{
    res.render('cadastro');
})

router.get('/home',authenticateToken, async (req,res)=>{
    let ingressos = await getAllIngressosDisponiveisModel();
    let htmlIngressos = "";
    for(let ingresso of ingressos){
        htmlIngressos +=     `
        <div class="caixa-ingresso">
            <h3>${ingresso.evento}</h3>
            <p>Data: ${ingresso.dataEvento}</p>
            <p>Preço: R$ ${ingresso.preco}</p>
            <form action="/ingressos/${ingresso._id}/comprar" method="POST">
            <input type="hidden" name="eventoId" value="${ingresso._id}"> 
            <input type="hidden" name="usuarioId" value="${req.user.id}"> 
            <button type="submit">Comprar</button>
            </form>
        </div>
        `;
    }
    res.render('home',{todosOsIngressos: htmlIngressos, nomeUsuario: req.user.nome.split(' ')[0]});
})

router.get('/meusIngressos', authenticateToken, async (req,res)=>{

    let usuarios = await getUsuarioByIdModel(req.user.id);
    let htmlIngressos = "";
    for(let ingresso of usuarios.ingressos){
        htmlIngressos +=     `
        <div class="caixa-ingresso">
            <h3>${ingresso.evento}</h3>
            <p>Data: ${ingresso.dataEvento}</p>
            <p>Preço: R$ ${ingresso.preco}</p>
            <form action="/paginas/ingressoIndividual/${ingresso.id}" method="GET">
            <input type="hidden" name="eventoId" value="${ingresso._id}"> 
            <input type="hidden" name="usuarioId" value="${req.user.id}"> 
            <button type="submit">Detalhes</button>
            </form>
        </div>
        `;
    }
    res.render('meusIngressos',{todosOsIngressos: htmlIngressos, nomeUsuario: req.user.nome.split(' ')[0]});
})

router.get('/ingressoIndividual/:id', authenticateToken, async (req,res)=>{
    const {id} = req.params
    const idUsuario = req.user.id;
    const usuario = await getUsuarioByIdModel(idUsuario);
    const ingressoEncontrado = usuario.ingressos.find(ingresso => ingresso._id.toString() === id);
    return res.status(201).render('ingressoIndividual',{ingresso: ingressoEncontrado});
})

router.get('/ingressoComprado', authenticateToken, async (req,res)=>{
    res.render('ingressoComprado');
})


export default router;