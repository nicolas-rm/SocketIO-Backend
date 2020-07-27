
import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Desconectar Un Cliente
export const desconectar = (cliente: Socket) => {
    // Detecta El Eveneto De Desconeccion
    // Detecta El Eveneto De Desconeccion
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado.');
    });
};

// Recibir Mensajes De Un Cliente
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // Recibe Datos Por El Evento Mensaje: Mensaje / Mensajes
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log('Mensaje Recibido:  ', payload);
        // Emitir Un Mensaje Del Servidor A Todos Los Clientes
        io.emit('mensaje-nuevo', payload);
    });
};

// Configura El Nombre Del Usuario Que Inicio Sesion
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    // Recibe Datos Por El Evento configurar-usuario: Nombre De Usuario A Utilizar
    cliente.on('configurar-usuario', (payload: { nombre: string }, respuesta: Function) => {
        console.log('Configurando Nombre Del Cliente: ', payload.nombre);

        // Poder Enviar Errores / Respuestas
        respuesta({
            ok: true,
            mensaje: `Usuario ${payload.nombre} Configurado Correctamente.`
        });
        // io.emit('configurar-usuario', payload);
    });
}


