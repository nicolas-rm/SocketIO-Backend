import Server from './classes/server';
import router from './routes/routes';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const server = Server.instance;


server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());
server.app.use(morgan('dev'));

server.app.use(cors());
// Rutas
server.app.use('/', router);
server.start();