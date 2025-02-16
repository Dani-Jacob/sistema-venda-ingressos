import { createUsuarioModel } from '../models/usuariosModels.js';
import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();

router.get('/',initialConfig);


async function initialConfig(req, res, next) {
    if(!(await arquivoExiste())){
        escreverArquivo();
    }
    let result = createUsuarioModel('admin', 'admin', '00000000000', 'admin@admin.com', 'admin', []);
    res.status(201).json(result);
}

async function escreverArquivo(){
    const caminhoArquivo = path.join(__dirname, 'configExecutado.txt');
    await fs.writeFile(caminhoArquivo, texto, (err) => {
        if (err) {
          console.log('Erro ao escrever no arquivo:', err);
        } else {
          console.log('Arquivo criado e conteúdo gravado com sucesso!');
        }
      });
}

async function arquivoExiste(){
    const caminhoArquivo = path.join(__dirname, 'configExecutado.txt');
    if (fs.existsSync(caminhoArquivo)) {
        return true;
    } 
    return false;
}

export default router;