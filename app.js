import express from 'express';
import mustacheExpress from 'mustache-express';
import mongo from './src/config/db.js';
import errorHandler from './src/middlewares/GetErrosMiddlewares.js';

//Importação de rotas
import authRoutes from './src/routes/AuthRoutes.js';
import usuariosRoutes from './src/routes/UsuariosRoutes.js';

const app = express();
const engine = mustacheExpress();


app.engine('mustache', engine);
app.set('views', './src/templates');
app.set('view engines', 'mustache'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongo);


//ROTAS
app.use('/token', authRoutes);
app.use('/usuarios', usuariosRoutes);


app.use(errorHandler);

export default app;