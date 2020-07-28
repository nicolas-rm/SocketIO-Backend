export class Usuario {

    // Obligatorio
    public id: string;

    // Opcional
    public nombre: string;

    // Sala
    public sala: string;

    constructor(id: string) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}