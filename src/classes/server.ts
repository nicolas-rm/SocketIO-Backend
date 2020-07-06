import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { PORT } from '../global/enviroment';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    public server: http.Server;

    private constructor() {
        this.app = express();
        this.port = PORT;
        this.server = new http.Server(this.app);
        this.io = socketIO(this.server).origins("*:*");

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('\nEscuchando Conexiones', 'Sockets');
        this.io.on('connection', (cliente) => {
            console.log('Cliente Conectado.');
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log('Server Conectado En El Puerto: ', this.port);
            console.log('\n');
        });
    }
}