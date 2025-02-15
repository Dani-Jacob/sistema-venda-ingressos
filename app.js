import express from 'express';
import mustacheExpress from 'mustache-express';
import mongo from './src/config/db.js';

//Importação de rotas
import authRoutes from './src/routes/AuthRoutes.js';

const app = express();
const engine = mustacheExpress();


app.engine('mustache', engine);
app.set('views', './src/templates');
app.set('view engines', 'mustache'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongo);

//ROTAS
app.use('/token',authRoutes);


export default app;