
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);

}

// Desconectar Un Cliente
export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
    // Detecta El Eveneto De Desconeccion
    // Detecta El Eveneto De Desconeccion
    cliente.on('disconnect', () => {
        // console.log('Cliente Desconectado.');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
};

// Recibir Mensajes De Un Cliente
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // Recibe Datos Por El Evento Mensaje: Mensaje / Mensajes
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        // console.log('Mensaje Recibido:  ', payload);
        // Emitir Un Mensaje Del Servidor A Todos Los Clientes
        io.emit('mensaje-nuevo', payload);
    });
};

// Configura El  Usuario Que Inicio Sesion
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    // Recibe Datos Por El Evento configurar-usuario: Nombre De Usuario A Utilizar
    cliente.on('configurar-usuario', (payload: { nombre: string }, respuesta: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        // console.log('Configurando Nombre Del Cliente: ', payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());

        // Poder Enviar Errores / Respuestas
        respuesta({
            ok: true,
            mensaje: `Usuario ${payload.nombre} Configurado Correctamente.`
        });
        // io.emit('configurar-usuario', payload);
    });
}


// Escuchar Usuarios Activos
export const usuariosActivos = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('usuarios-activos', () => {
        // console.log('\nPidiendo Informacion, Cliente: ', cliente.id);
        io.in(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}


