
import { Socket } from 'socket.io';

// Desconectar Un Cliente
export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado.');
    });
};

// Recibir Mensajes De Un Cliente
export const mensaje = (cliente: Socket) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje Recibido:  ', payload);
    });
};