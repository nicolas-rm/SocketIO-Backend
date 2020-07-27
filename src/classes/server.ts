import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { PORT } from '../global/enviroment';
import * as socket from '../sockets/sockets';
export default class Server {

    // Patron Singleton
    private static _instance: Server;

    // Declaracion Del Server Express
    public app: express.Application;
    // Puerto Del Servidor
    public port: number;

    // Declaracion Del Server Socket
    public io: socketIO.Server;
    // Declaracion Del Server HTTP
    public server: http.Server;

    // Private: Parte del patron Singleton
    private constructor() {
        // Inicializacion Del Server Express
        this.app = express();
        // Configuracion Del Puerto
        this.port = PORT;

        // Compatibilidad Entre Express y Sockets
        // Utilizando HTTP Como Intermediario.
        this.server = new http.Server(this.app);
        // Configurando El Servidor De Sockets.
        // Origins. Cors Del Sockets.
        // Cors: Filtro Que Permite La Entrada De Peticiones Desde Diferentes Sitios
        this.io = socketIO(this.server).origins("*:*");

        // Primeros Pasos Del Socket
        this.escucharSockets();
    }

    // Metodo Principal y Unico Para La Ejecucion, Patron Singleton
    public static get instance() {
        // Al LLamamo Crea Una Nueva Instancia o Reenvia La Instancia Creada Previamente
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('\nEscuchando Conexiones', 'Sockets');
        this.io.on('connection', (cliente) => {

            console.log('Cliente Conectado.');

            // Mostrar ID Del Socket
            console.log(cliente.id);

            // Configurar Usuario
            socket.configurarUsuario(cliente, this.io);
            

            // Recibir Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);

        });
    }

    start() {
        // Ejecutando El Servidor, Con La Obtencion Del Puerto.
        this.server.listen(this.port, () => {
            console.log('Server Conectado En El Puerto: ', this.port);
            console.log('\n');
        });
    }
}