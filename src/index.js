import express from 'express';
import { sequelize } from './models/index.js';
import 'dotenv/config';
import cors from 'cors';

import models from './models/index.js';
import router from './routes/index.js';

const port = process.env.SERVER_PORT ?? 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

server.use(cors());

// Aplicar contexto de models
server.use((req, res, next) => {
    req.context = { models };
    next();
});

// Aplicando middlewares de rota
server.use('/usuarios', router.usuario);
server.use('/curriculos', router.curriculo);
server.use('/formacoes', router.formacao);
server.use('/experiencias', router.experiencia);

server.get('/', (req, res) => {
    res.send('Bem vindo a API de Currículo!');
});

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        console.log('Banco de dados reiniciado e criado com os dados padrão!');
    }

    server.listen(port, () => {
        console.log(`Servidor ouvindo na porta ${port}...`);
    });
});

export default server;