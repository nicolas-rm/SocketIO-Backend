import { Usuario } from './usuario';

export class UsuarioLista {
    private lista: Usuario[] = [];

    constructor() {

    }

    // Agregar Un Usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        // console.log('Agregando Usuario: ', usuario);
        return usuario;
    }

    // Actualizar Nombre De Usuario
    public actualizarNombre(id: string, nombre: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        // console.log(' ======== Actualizando Usuario ========');
        // console.log(this.lista);
    }

    // Obtener Lista De Usuarios
    public getLista() {
        return this.lista.filter((usuario => usuario.nombre !== 'sin-nombre'));
    }

    // Obtener Usuario
    public getUsuario(id: string) {
        return this.lista.find((usuario) => {
            return usuario.id;
        });
    }

    // Obtener Usuarios En Una Sala En Especifico
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter((usuario) => {
            return usuario.sala == sala;
        });
    }

    // Borrar Usaurio
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter((usuario) => {
            return usuario.id !== id;
        });
        return tempUsuario;
    }
}