import mongoose from 'mongoose';
import CustomError from '../customErros/CustomError.js';

export function verificarIdMongoose(id,next){
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new CustomError(400, 'ID inválido!'));
    }
}

export function getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
