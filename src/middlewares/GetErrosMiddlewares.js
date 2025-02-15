import CustomError from "../customErros/CustomError.js";

const errorHandler = (err, req, res, next) => {
    
    if (err instanceof CustomError) {
        return res.status(err.status).json({ error: err.message });
    }
    console.log(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
};

export default errorHandler;
