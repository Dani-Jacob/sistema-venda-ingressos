import express from 'express';
import mustacheExpress from 'mustache-express';
import mongo from './src/config/db.js';
import errorHandler from './src/middlewares/GetErrosMiddlewares.js';
import cookieParser from 'cookie-parser';

//Importação de rotas
import authRoutes from './src/routes/AuthRoutes.js';
import usuariosRoutes from './src/routes/UsuariosRoutes.js';
import ingressosRoutes from  './src/routes/IngressosRoutes.js';
import paginasRoutes from './src/routes/PaginasRoutes.js';
import configRoutes from './src/config/config.js';

const app = express();
const engine = mustacheExpress();


app.engine('mustache', engine);
app.set('views', './src/templates');
app.set('view engine', 'mustache'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongo);
app.use(cookieParser())




//ROTAS
app.use('/paginas', paginasRoutes);
app.use('/token', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/ingressos', ingressosRoutes);
app.use('/config',configRoutes);

app.get("/", (req,res)=> res.redirect('/paginas/meusIngressos'));



app.use(errorHandler);

export default app;