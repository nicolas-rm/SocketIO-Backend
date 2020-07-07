
import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Desconectar Un Cliente
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado.');
    });
};

// Recibir Mensajes De Un Cliente
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje Recibido:  ', payload);

        // Emitir Un Mensaje Del Servidor A Todos Los Clientes
        io.emit('mensaje-nuevo', payload);
    });
};


